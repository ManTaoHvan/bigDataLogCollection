package com.pv.utils;


import com.pv.common.Config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Map;
import java.util.logging.Logger;


public class HttpUtil {

    private static final Logger logger = Logger.getLogger("HttpUtil");

    /**
     * 允许 JS 跨域设置
     *
     * <p>
     * <!-- 使用 nginx 注意在 nginx.conf 中配置 -->
     * <p>
     * http {
     * ......
     * add_header Access-Control-Allow-Origin *;
     * ......
     * }
     * </p>
     *
     * <p>
     * 非 ngnix 下，如果该方法设置不管用、可以尝试增加下行代码。
     * <p>
     * response.setHeader("Access-Control-Allow-Origin", "*");
     * </p>
     *
     * @注释加密 
     */
    public static void allowJsCrossDomain(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        response.setHeader("Access-Control-Max-Age", "3600");
    }

    /**
     * <p>
     * 判断请求是否为 AJAX
     * </p>
     *
     * @注释加密 
     * @注释加密 
     */
    public static boolean isAjax(HttpServletRequest request) {
        return "XMLHttpRequest".equals(request.getHeader("X-Requested-With")) ? true : false;
    }

    /**
     * <p>
     * AJAX 设置 response 返回状态
     * </p>
     *
     * @注释加密 
     * @注释加密 
     * @注释加密 
     */
    public static void ajaxStatus(HttpServletResponse response, int status, String tip) {
        try {
            response.setContentType("text/html;charset=" + Config.CHARSET_UTF8);
            response.setStatus(status);
            PrintWriter out = response.getWriter();
            out.print(tip);
            out.flush();
        } catch (IOException e) {
            logger.severe(e.toString());
        }
    }

    /**
     * <p>
     * 获取当前 URL 包含查询条件
     * </p>
     *
     * @注释加密 
     * @注释加密 
     * @注释加密 
     * @注释加密 
     */
    public static String getQueryString(HttpServletRequest request, String encode) throws IOException {
        StringBuffer sb = new StringBuffer(request.getRequestURL());
        String query = request.getQueryString();
        if (query != null && query.length() > 0) {
            sb.append("?").append(query);
        }
        return URLEncoder.encode(sb.toString(), encode);
    }

    /**
     * <p>
     * getRequestURL是否包含在URL之内
     * </p>
     *
     * @注释加密 
     * @注释加密 
     * @注释加密 
     */
    public static boolean inContainURL(HttpServletRequest request, String url) {
        boolean result = false;
        if (url != null && !"".equals(url.trim())) {
            String[] urlArr = url.split(";");
            StringBuffer reqUrl = new StringBuffer(request.getRequestURL());
            for (int i = 0; i < urlArr.length; i++) {
                if (reqUrl.indexOf(urlArr[i]) > 1) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    }

    /**
     * <p>
     * URLEncoder 返回地址
     * </p>
     *
     * @注释加密 
     * @注释加密 
     * @注释加密 
     * @注释加密 
     */
    public static String encodeRetURL(String url, String retParam, String retUrl) {
        return encodeRetURL(url, retParam, retUrl, null);
    }

    /**
     * <p>
     * URLEncoder 返回地址
     * </p>
     *
     * @注释加密 
     * @注释加密 
     * @注释加密 
     * @注释加密 
     * @注释加密 
     */
    public static String encodeRetURL(String url, String retParam, String retUrl, Map<String, String> data) {
        if (url == null) {
            return null;
        }

        StringBuffer retStr = new StringBuffer(url);
        retStr.append("?");
        retStr.append(retParam);
        retStr.append("=");
        try {
            retStr.append(URLEncoder.encode(retUrl, Config.CHARSET_UTF8));
        } catch (UnsupportedEncodingException e) {
            logger.severe("encodeRetURL error." + url);
            e.printStackTrace();
        }

        if (data != null) {
            for (Map.Entry<String, String> entry : data.entrySet()) {
                retStr.append("&").append(entry.getKey()).append("=").append(entry.getValue());
            }
        }

        return retStr.toString();
    }

    /**
     * <p>
     * URLDecoder 解码地址
     * </p>
     *
     * @注释加密 
     * @注释加密 
     */
    public static String decodeURL(String url) {
        if (url == null) {
            return null;
        }
        String retUrl = "";

        try {
            retUrl = URLDecoder.decode(url, Config.CHARSET_UTF8);
        } catch (UnsupportedEncodingException e) {
            logger.severe("encodeRetURL error." + url);
            e.printStackTrace();
        }

        return retUrl;
    }

    /**
     * <p>
     * GET 请求
     * </p>
     *
     * @注释加密 
     * @注释加密 
     */
    public static boolean isGet(HttpServletRequest request) {
        if ("GET".equalsIgnoreCase(request.getMethod())) {
            return true;
        }
        return false;
    }

    /**
     * <p>
     * POST 请求
     * </p>
     *
     * @注释加密 
     * @注释加密 
     */
    public static boolean isPost(HttpServletRequest request) {
        if ("POST".equalsIgnoreCase(request.getMethod())) {
            return true;
        }
        return false;
    }

    /**
     * <p>
     * 请求重定向至地址 location
     * </p>
     *
     * @注释加密 
     * @注释加密 
     */
    public static void sendRedirect(HttpServletResponse response, String location) {
        try {
            response.sendRedirect(location);
        } catch (IOException e) {
            logger.severe("sendRedirect location:" + location);
            e.printStackTrace();
        }
    }

    /**
     * <p>
     * 获取Request Playload 内容
     * </p>
     *
     * @注释加密 
     * @注释加密 
     */
    public static String requestPlayload(HttpServletRequest request) throws IOException {
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader bufferedReader = null;
        try {
            InputStream inputStream = request.getInputStream();
            if (inputStream != null) {
                bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
                char[] charBuffer = new char[128];
                int bytesRead = -1;
                while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                    stringBuilder.append(charBuffer, 0, bytesRead);
                }
            } else {
                stringBuilder.append("");
            }
        } catch (IOException ex) {
            throw ex;
        } finally {
            if (bufferedReader != null) {
                try {
                    bufferedReader.close();
                } catch (IOException ex) {
                    throw ex;
                }
            }
        }
        return stringBuilder.toString();
    }

    /**
     * <p>
     * 获取当前完整请求地址
     * </p>
     *
     * @注释加密 
     * @注释加密 
     */
    public static String getRequestUrl(HttpServletRequest request) {
        StringBuffer url = new StringBuffer(request.getScheme());
        // 注释加密 
        url.append("://");
        url.append(request.getHeader("host"));// 请求服务器
        url.append(request.getRequestURI());// 工程名
        if (request.getQueryString() != null) {
            // 注释加密 
            url.append("?").append(request.getQueryString());
        }
        return url.toString();
    }
}