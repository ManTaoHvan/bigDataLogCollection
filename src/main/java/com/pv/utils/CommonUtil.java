package com.pv.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.security.MessageDigest;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;
import java.util.regex.Pattern;

/**
 * @注释加密 
 * @注释加密 
 * @注释加密 
 * @注释加密 
 */
public class CommonUtil {

    private static Logger logger = LoggerFactory.getLogger(CommonUtil.class);

    /**
     * ip check
     */
    private static Pattern pattern = Pattern.compile("^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:)|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}(:[0-9A-Fa-f]{1,4}){1,2})|(([0-9A-Fa-f]{1,4}:){4}(:[0-9A-Fa-f]{1,4}){1,3})|(([0-9A-Fa-f]{1,4}:){3}(:[0-9A-Fa-f]{1,4}){1,4})|(([0-9A-Fa-f]{1,4}:){2}(:[0-9A-Fa-f]{1,4}){1,5})|([0-9A-Fa-f]{1,4}:(:[0-9A-Fa-f]{1,4}){1,6})|(:(:[0-9A-Fa-f]{1,4}){1,7})|(([0-9A-Fa-f]{1,4}:){6}(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])(\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])){3})|(([0-9A-Fa-f]{1,4}:){5}:(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])(\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])){3})|(([0-9A-Fa-f]{1,4}:){4}(:[0-9A-Fa-f]{1,4}){0,1}:(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])(\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])){3})|(([0-9A-Fa-f]{1,4}:){3}(:[0-9A-Fa-f]{1,4}){0,2}:(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])(\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])){3})|(([0-9A-Fa-f]{1,4}:){2}(:[0-9A-Fa-f]{1,4}){0,3}:(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])(\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])){3})|([0-9A-Fa-f]{1,4}:(:[0-9A-Fa-f]{1,4}){0,4}:(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])(\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])){3})|(:(:[0-9A-Fa-f]{1,4}){0,5}:(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])(\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])){3}))$");
    private static Pattern ipv4 = Pattern.compile("^(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])(\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])){3}$");

    /* Lang Utils */

    public static Integer getInteger(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            return -1;
        }
    }

    public static boolean isEmptyStr(String str) {
        return str == null || str.isEmpty();
    }

    public static String getRandomString() {
        return getRandomString(6);
    }

    public static String getRandomString(int length) {
        // 注释加密 
        String str = "zxcvbnmlkjhgfdsaqwertyuiopQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
        // 注释加密 
        Random random = new Random();
        StringBuffer sb = new StringBuffer();
        // 注释加密 
        for (int i = 0; i < length; ++i) {
            // 注释加密 
            int number = random.nextInt(62);
            // 注释加密 
            sb.append(str.charAt(number));
        }
        // 注释加密 
        return sb.toString();
    }

    /* Ip Utils */

    public static String[] checkIPs(String[] ip_array) {
        String[] str = new String[ip_array.length];
        for (int i = 0; i < ip_array.length; i++) {
            if (pattern.matcher(ip_array[i]).matches()) {
                str[i] = "IPv6";
            } else if (ipv4.matcher(ip_array[i]).matches()) {
                str[i] = "IPv4";
            } else {
                str[i] = "Neither";
            }
        }
        return str;
    }

    /**
     * 2-ipv6 1-ipv4 0-neither
     *
     * @注释加密 
     * @注释加密 
     */
    public static int checkIP(String ip) {
        int str;
        if (pattern.matcher(ip).matches()) {
            str = 2;
        } else if (ipv4.matcher(ip).matches()) {
            str = 1;
        } else {
            str = 0;
        }
        return str;
    }

    public static void main(String[] args) {
        SimpleDateFormat pf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;
        try {
            date = pf.parse("2019-09-23 00:00:00");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        System.out.println(date);
    }
    /* Time Utils */
    public static String setTimeStamp(String time,String dataType) {
        SimpleDateFormat pf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;
        /*try {
            date = pf.parse(time);
        } catch (ParseException e) {
            e.printStackTrace();
        }*/
        SimpleDateFormat df = null;
        try {
            if (dataType.equals("month")){
                df = new SimpleDateFormat("yyyy-MM-dd");
                date=df.parse(time);
            }else if(dataType.equals("year")){
                df = new SimpleDateFormat("yyyy-MM");
                date=df.parse(time);
            } else if(dataType.equals("day")){
                df = new SimpleDateFormat("yyyy-MM-dd HH");
                date=df.parse(time);
            }
        }catch (ParseException e) {
            e.printStackTrace();
        }
        return df.format(date);
    }


    public static String setTimeDay(String time) {
        SimpleDateFormat pf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Date date = null;
        try {
            date = pf.parse(time);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        return df.format(date);
    }


    public static boolean checkZero_Three(){
        Calendar now = Calendar.getInstance();
        if(now.get(Calendar.MINUTE)>=0 && now.get(Calendar.MINUTE)<=6){
            return true;
        }else {
            return false;
        }
    }

    public static String getTimeStamp() {
        Date date = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return df.format(date);
    }

    public static String getTimeSS() {
        Date day = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
        return df.format(day);
    }

    public static String getTimeMonth() {
        Date day = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM");
        return df.format(day);
    }

    public static String getTimeYear() {
        Date day = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy");
        return df.format(day);
    }

    public static String getTimeDay() {
        Date day = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        return df.format(day);
    }
    public static String getDaySS() {
        Date day = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
        return df.format(day);
    }
    public static String getTimeHour() {
        Date day = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH");
        return df.format(day);
    }

    public static String getLastHour(int index) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH");
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.HOUR_OF_DAY, index);//设置为前一小时
        Date date = calendar.getTime();
        return df.format(date);
    }

    public static String formatDate(int index) {
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, index);
        Date date = calendar.getTime();
        return df.format(date);
    }

    public static Date formatDate(String date,String format){
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        try {
            return sdf.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String getTodayDay() {
        Date day = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
        return df.format(day);
    }

    public static Integer getDiffDays(String now,String before) {
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
        try {
            Date nowTime = df.parse(now);
            Date beforeTime = df.parse(before);
            int days = (int) ((nowTime.getTime() - beforeTime.getTime()) / (1000*3600*24))+1;
            return days;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return 0;
    }

    /*得到上个月的月份值*/
    public static String lastMonth() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM");
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -1);
        Date date = calendar.getTime();
        return df.format(date);
    }


    public static String unixTime(long time) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date formatTime = new Date(time);
        String date = simpleDateFormat.format(formatTime);
        return date;
    }

    /**
     * md5加密
     *
     * @注释加密 
     * @注释加密 
     */
    public final static String MD5(String s) {
        char hexDigits[] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'a', 'b', 'c', 'd', 'e', 'f'};
        try {
            byte[] btInput = s.getBytes();
            // 注释加密 
            MessageDigest mdInst = MessageDigest.getInstance("MD5");
            // 注释加密 
            mdInst.update(btInput);
            // 注释加密 
            byte[] md = mdInst.digest();
            // 注释加密 
            int j = md.length;
            char str[] = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte byte0 = md[i];
                str[k++] = hexDigits[byte0 >>> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(str);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String getFileSize(File file) {
        String size = "";
        if (file.exists() && file.isFile()) {
            long fileS = file.length();
            DecimalFormat df = new DecimalFormat("#.00");
            if (fileS < 1024) {
                size = df.format((double) fileS) + "B";
            } else if (fileS < 1048576) {
                size = df.format((double) fileS / 1024) + "KB";
            } else if (fileS < 1073741824) {
                size = df.format((double) fileS / 1048576) + "MB";
            } else {
                size = df.format((double) fileS / 1073741824) + "GB";
            }
        } else {
            size = "0B";
        }
        return size;
    }

    /*识别操作系统*/
    public static String OsName(){
        String path="";
        String osName = System.getProperty("os.name");
        if (osName.toLowerCase().startsWith("mac")) {// 苹果

        } else if (osName.toLowerCase().startsWith("win")) {// windows

        } else {// unix or linux

        }
        return path;
    }

}
