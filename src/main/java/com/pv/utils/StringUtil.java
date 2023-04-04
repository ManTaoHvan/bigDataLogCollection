package com.pv.utils;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @注释加密 
 * @注释加密 
 * @注释加密 
 */
public class StringUtil {

    public static boolean isValidStr(String str) {
        if (str != null && !str.equals(""))
            return true;
        else
            return false;
    }

    public static String format(String str) {
        if (str == null)
            return "";
        else
            return str;
    }

    public static boolean deleteFile(String sPath) {
        boolean flag = false;
        File file = new File(sPath);
        if (!file.isDirectory()) {
            return flag;
        }
        String[] tempList = file.list();
        File temp = null;
        for (int i = 0; i < tempList.length; i++) {
            temp = new File(sPath + File.separator + tempList[i]);
            temp.delete();
        }
        flag = true;
        return flag;
    }

    public static ResponseEntity<byte[]> downloadFile(String filename) throws IOException {
        File file = new File(filename);
        byte[] body = null;
        InputStream is = new FileInputStream(file);
        body = new byte[is.available()];
        is.read(body);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.add("Content-Disposition", "attchement;filename=" + new String(file.getName().getBytes("utf-8"), "ISO8859-1"));
        // 注释加密 
        HttpStatus statusCode = HttpStatus.OK;
        // 注释加密 
        ResponseEntity<byte[]> entity = new ResponseEntity<byte[]>(body, headers, statusCode);
        return entity;
    }


    public static String dateFormat(Date date){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(date);
    }


}
