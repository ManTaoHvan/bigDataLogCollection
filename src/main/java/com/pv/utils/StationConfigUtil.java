package com.pv.utils;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.charset.Charset;

/**
 * @注释加密 
 * @注释加密 
 * @注释加密 
 * @注释加密 
 */
public class StationConfigUtil {

    private String charset = Charset.defaultCharset().toString();

    private String processInputStream(InputStream in, String charset) throws Exception {
        ByteArrayOutputStream result = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int length;
        while ((length = in.read(buffer)) != -1) {
            result.write(buffer, 0, length);
        }
        String str = result.toString(charset);
        return str;
    }

    /*本地执行cmd命令*/
    private String cmdIn(String cmd) {
        String[] cmds = {"/bin/sh","-c",cmd};
        Process pro = null;
        String stdout="";
        try {
            pro = Runtime.getRuntime().exec(cmds);
            pro.waitFor();
            InputStream in = pro.getInputStream();
            stdout = processInputStream(in, charset);
            in.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (pro != null){
                pro.destroy();
            }
        }
        return stdout;
    }


}
