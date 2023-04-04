package com.pv.modular.collect.utils;

import com.google.common.collect.Lists;
import com.pv.modular.collect.entity.CollecctOffLineBean;
import com.pv.modular.collect.entity.CollecctTotalBean;
import com.pv.utils.ExportExcelUtil;
import com.pv.utils.StringUtil;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @注释加密 
 * @注释加密 
 * @注释加密 
 * @注释加密 
 */
public class downUtil {

    public static String downCollect(String path, List<CollecctTotalBean> beans){
        List<String> headerList = Lists.newArrayList();
        headerList.add("部门名称");
        headerList.add("日志IP");
        headerList.add("纳管IPS");
        headerList.add("项目名称");
        headerList.add("日志行数");
        headerList.add("设备类型");
        headerList.add("采集器IP");
        headerList.add("时间");

        List<List<Object>> dataList = Lists.newArrayList();//列数据
        for (CollecctTotalBean bean:beans){
            List<Object> dataRowList = Lists.newArrayList();
            dataRowList.add(bean.getDepartName());
            dataRowList.add(bean.getFip());
            dataRowList.add(bean.getIps());
            dataRowList.add(bean.getProName());
            dataRowList.add(bean.getFnum());
            dataRowList.add(bean.getSysType());
            dataRowList.add(bean.getCip());
            dataRowList.add(bean.getCreateTime());
            dataList.add(dataRowList);
        }
        SXSSFWorkbook wb = new SXSSFWorkbook(500);
        Sheet sheet = wb.createSheet("下载");
        ((SXSSFSheet) sheet).trackAllColumnsForAutoSizing();
        int rownum1=0;
        Map<String, CellStyle> styles1 = ExportExcelUtil.initialize(wb,sheet,"", headerList, rownum1);
        rownum1=1;
        for (int m = 0; m < dataList.size(); m++) {
            Row row = sheet.createRow(rownum1++);
            for (int n = 0; n < dataList.get(m).size(); n++) {
                ExportExcelUtil.addCell(wb,styles1,row, n, dataList.get(m).get(n),0, Class.class);
            }
        }
        String filename = "collect_"+ StringUtil.dateFormat(new Date());
        FileOutputStream os = null;
        try {
            os = new FileOutputStream(path+ File.separator+filename+".xlsx");
            wb.write(os);
            wb.dispose();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("Export success.");
        return path+ File.separator+filename+".xlsx";
    }


    public static String downOffline(String path, List<CollecctOffLineBean> beans){
        List<String> headerList = Lists.newArrayList();
        headerList.add("部门名称");
        headerList.add("设备IP");
        headerList.add("纳管IPS");
        headerList.add("项目名称");
        headerList.add("设备类型");
        headerList.add("采集器IP");
        headerList.add("离线时长");
        headerList.add("更新时间");

        List<List<Object>> dataList = Lists.newArrayList();//列数据
        for (CollecctOffLineBean bean:beans){
            List<Object> dataRowList = Lists.newArrayList();
            dataRowList.add(bean.getDepartName());
            dataRowList.add(bean.getSocip());
            dataRowList.add(bean.getIps());
            dataRowList.add(bean.getProName());
            dataRowList.add(bean.getSysType());
            dataRowList.add(bean.getCip());
            dataRowList.add(bean.getOffDays());
            dataRowList.add(bean.getUpdateTime());
            dataList.add(dataRowList);
        }
        SXSSFWorkbook wb = new SXSSFWorkbook(500);
        Sheet sheet = wb.createSheet("下载");
        ((SXSSFSheet) sheet).trackAllColumnsForAutoSizing();
        int rownum1=0;
        Map<String, CellStyle> styles1 = ExportExcelUtil.initialize(wb,sheet,"", headerList, rownum1);
        rownum1=1;
        for (int m = 0; m < dataList.size(); m++) {
            Row row = sheet.createRow(rownum1++);
            for (int n = 0; n < dataList.get(m).size(); n++) {
                ExportExcelUtil.addCell(wb,styles1,row, n, dataList.get(m).get(n),0, Class.class);
            }
        }
        String filename = "offLine_"+ StringUtil.dateFormat(new Date());
        FileOutputStream os = null;
        try {
            os = new FileOutputStream(path+ File.separator+filename+".xlsx");
            wb.write(os);
            wb.dispose();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("Export success.");
        return path+ File.separator+filename+".xlsx";
    }




}
