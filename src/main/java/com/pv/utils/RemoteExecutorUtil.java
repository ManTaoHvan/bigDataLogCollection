package com.pv.utils;

import ch.ethz.ssh2.ChannelCondition;
import ch.ethz.ssh2.Connection;
import ch.ethz.ssh2.Session;
import ch.ethz.ssh2.StreamGobbler;
import org.apache.commons.io.IOUtils;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
 // 注释加密 

@SuppressWarnings("serial")
public class RemoteExecutorUtil implements java.io.Serializable {

    /* 远程机器IP*/
    private String ip;
    /* 用户名*/
    private String username;
    /* 密码*/
    private String password;
    /* 标准输出字符串*/
	private String stdoutStr = "";
    /* 标准错误字符串*/
	private String stderrStr = "";

    private String charset = Charset.defaultCharset().toString();

    private static final int TIME_OUT = 1000 * 5 * 60;

    private Connection conn = null;
	private int port;

    /**
     * 构造函数
     * @注释加密 
     * @注释加密 
     * @注释加密 
     */
    public RemoteExecutorUtil(String ip, String username, String pasword, int port) {
        this.ip = ip;
        this.username = username;
        this.password = pasword;
        this.port = port;
    }

    /**
     * 登录
     * @注释加密 
     * @注释加密 
     */
    private boolean login() throws IOException {
        conn = new Connection(ip, port);
        conn.connect();
        return conn.authenticateWithPassword(username, password);
    }

    /**
     * 执行脚本
     * @注释加密 
     * @注释加密 
     * @注释加密 
     */
    public int exec(String cmd) throws Exception {
        InputStream stdout = null;
        InputStream stderr = null;
        int retCode = -1;
        try {
            if (login()) {
                Session session = conn.openSession();
                // 注释加密 
                session.execCommand(cmd);

                stdout = new StreamGobbler(session.getStdout());
                stdoutStr = processInputStream(stdout, charset);

                // 注释加密 
                
                stderr = new StreamGobbler(session.getStderr());
                stderrStr = processInputStream(stderr, charset);

                session.waitForCondition(ChannelCondition.EXIT_STATUS, TIME_OUT);

                retCode = session.getExitStatus();
            } else {
                throw new Exception("登录远程机器失败" + ip);
            }
        } finally {
            if (conn != null) {
                conn.close();
            }
            IOUtils.closeQuietly(stdout);
            IOUtils.closeQuietly(stderr);
        }
        return retCode;
    }

    /**
     * @注释加密 
     * @注释加密 
     * @注释加密 
     * @注释加密 
     * @注释加密 
     */
    private String processInputStream(InputStream in, String charset) throws Exception {
        byte[] buf = new byte[1024];
        StringBuilder sb = new StringBuilder();
        while (in.read(buf) != -1) {
            sb.append(new String(buf, charset));
        }
        return sb.toString();
    }

    /**
     * 执行
     * @注释加密 
     */
    public static String hcConfig(String collectorId,String collectorImei) throws Exception {
    	String NSLOOKUP_HOST = ConfigUtil.getConfig("hcIP");
        String NSLOOKUP_USERNAME = ConfigUtil.getConfig("hcName");
        String NSLOOKUP_PASSWORD = ConfigUtil.getConfig("hcPasswd");
        int NSLOOKUP_PORT = 22;
        String filePath="/home/ly/hc";
        RemoteExecutorUtil remoteExecutorUtil = new RemoteExecutorUtil(NSLOOKUP_HOST, NSLOOKUP_USERNAME, NSLOOKUP_PASSWORD,NSLOOKUP_PORT);
        remoteExecutorUtil.config(filePath,collectorId,collectorImei);
        System.out.println("done!");
        return "success";
	}

    public static String qnConfig(String collectorId,String collectorImei) throws Exception {
        String NSLOOKUP_HOST = ConfigUtil.getConfig("qnIP");
        String NSLOOKUP_USERNAME = ConfigUtil.getConfig("qnName");
        String NSLOOKUP_PASSWORD = ConfigUtil.getConfig("qnPasswd");
        int NSLOOKUP_PORT = 22;
        String filePath="/home/ly/qn";
        RemoteExecutorUtil remoteExecutorUtil = new RemoteExecutorUtil(NSLOOKUP_HOST, NSLOOKUP_USERNAME, NSLOOKUP_PASSWORD,NSLOOKUP_PORT);
        remoteExecutorUtil.config(filePath,collectorId,collectorImei);
        System.out.println("done!");
        return "success";
    }

    public static String lnConfig(String collectorId,String collectorImei) throws Exception {
        String NSLOOKUP_HOST = ConfigUtil.getConfig("lnIP");
        String NSLOOKUP_USERNAME = ConfigUtil.getConfig("lnName");
        String NSLOOKUP_PASSWORD = ConfigUtil.getConfig("lnPasswd");
        int NSLOOKUP_PORT = 22;
        String filePath="/home/ly/ln";
        RemoteExecutorUtil remoteExecutorUtil = new RemoteExecutorUtil(NSLOOKUP_HOST, NSLOOKUP_USERNAME, NSLOOKUP_PASSWORD,NSLOOKUP_PORT);
        remoteExecutorUtil.config(filePath,collectorId,collectorImei);
        System.out.println("done!");
        return "success";
    }

    public static String gxConfig(String collectorId,String collectorImei) throws Exception {
        String NSLOOKUP_HOST = ConfigUtil.getConfig("gxIP");
        String NSLOOKUP_USERNAME = ConfigUtil.getConfig("gxName");
        String NSLOOKUP_PASSWORD = ConfigUtil.getConfig("gxPasswd");
        int NSLOOKUP_PORT = 22;
        String filePath="/home/ly/gx";
        RemoteExecutorUtil remoteExecutorUtil = new RemoteExecutorUtil(NSLOOKUP_HOST, NSLOOKUP_USERNAME, NSLOOKUP_PASSWORD,NSLOOKUP_PORT);
        remoteExecutorUtil.config(filePath,collectorId,collectorImei);
        System.out.println("done!");
        return "success";
    }


    public void config(String filePath,String collectorId,String collectorImei) throws Exception {
        String command = "cd "+filePath+" && java -jar PVAnalyzingServer-v1.jar generateCollectorConfigFile "+collectorId+" "+collectorImei;
        if (conn == null) {
            login();
        }
        exec(command);
    }


    public static String hcUpdate(String collectorImei,String county) throws Exception {
        String NSLOOKUP_HOST = ConfigUtil.getConfig("hcIP");
        String NSLOOKUP_USERNAME = ConfigUtil.getConfig("hcName");
        String NSLOOKUP_PASSWORD = ConfigUtil.getConfig("hcPasswd");
        int NSLOOKUP_PORT = 22;
        String filePath="/home/ly/"+county;
        RemoteExecutorUtil remoteExecutorUtil = new RemoteExecutorUtil(NSLOOKUP_HOST, NSLOOKUP_USERNAME, NSLOOKUP_PASSWORD,NSLOOKUP_PORT);
        remoteExecutorUtil.update(filePath,collectorImei);
        System.out.println("done!");
        return "success";
    }

    public static String qnUpdate(String collectorImei,String county) throws Exception {
        String NSLOOKUP_HOST = ConfigUtil.getConfig("qnIP");
        String NSLOOKUP_USERNAME = ConfigUtil.getConfig("qnName");
        String NSLOOKUP_PASSWORD = ConfigUtil.getConfig("qnPasswd");
        int NSLOOKUP_PORT = 22;
        String filePath="/home/ly/"+county;
        RemoteExecutorUtil remoteExecutorUtil = new RemoteExecutorUtil(NSLOOKUP_HOST, NSLOOKUP_USERNAME, NSLOOKUP_PASSWORD,NSLOOKUP_PORT);
        remoteExecutorUtil.update(filePath,collectorImei);
        System.out.println("done!");
        return "success";
    }

    public static String lnUpdate(String collectorImei,String county) throws Exception {
        String NSLOOKUP_HOST = ConfigUtil.getConfig("lnIP");
        String NSLOOKUP_USERNAME = ConfigUtil.getConfig("lnName");
        String NSLOOKUP_PASSWORD = ConfigUtil.getConfig("lnPasswd");
        int NSLOOKUP_PORT = 22;
        String filePath="/home/ly/"+county;
        RemoteExecutorUtil remoteExecutorUtil = new RemoteExecutorUtil(NSLOOKUP_HOST, NSLOOKUP_USERNAME, NSLOOKUP_PASSWORD,NSLOOKUP_PORT);
        remoteExecutorUtil.update(filePath,collectorImei);
        System.out.println("done!");
        return "success";
    }

    public static String gxUpdate(String collectorImei,String county) throws Exception {
        String NSLOOKUP_HOST = ConfigUtil.getConfig("gxIP");
        String NSLOOKUP_USERNAME = ConfigUtil.getConfig("gxName");
        String NSLOOKUP_PASSWORD = ConfigUtil.getConfig("gxPasswd");
        int NSLOOKUP_PORT = 22;
        String filePath="/home/ly/"+county;
        RemoteExecutorUtil remoteExecutorUtil = new RemoteExecutorUtil(NSLOOKUP_HOST, NSLOOKUP_USERNAME, NSLOOKUP_PASSWORD,NSLOOKUP_PORT);
        remoteExecutorUtil.update(filePath,collectorImei);
        System.out.println("done!");
        return "success";
    }

    public void update(String filePath,String collectorImei) throws Exception {
        String command = "cd "+filePath+" && java -jar PVAnalyzingServer-v1.jar generateCollectorUpgradeFile "+collectorImei;
        if (conn == null) {
            login();
        }
        exec(command);
    }



}