package com.pv.utils;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class ExcelUtil {
    // 注释加密 
    private static DecimalFormat df = new DecimalFormat("0");
    // 注释加密 
    private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    // 注释加密 
    private static DecimalFormat nf = new DecimalFormat("0");
    // 注释加密 

    public static Map<String, ArrayList<ArrayList<Object>>> readExcel(File file) {
        if (file == null) {
            return null;
        }
        if (file.getName().endsWith("xlsx")) {
            // 注释加密 
            // 注释加密 
            return readExcel2007(file);
        } else {
            // 注释加密 
            // 注释加密 
            return readExcel2003(file);
        }
    }

    /*
     * @注释加密 
     * lists.get(0).get(0)表示过去Excel中0行0列单元格
     */
    private static Map<String, ArrayList<ArrayList<Object>>> readExcel2003(File file) {
        try {
            Map<String, ArrayList<ArrayList<Object>>> map = new HashMap<>();
            ArrayList<ArrayList<Object>> rowList;
            ArrayList<Object> colList;
            HSSFWorkbook wb = new HSSFWorkbook(new FileInputStream(file));
            for (int k = 0; k < wb.getNumberOfSheets(); k++) {
                HSSFSheet sheet = wb.getSheetAt(k);
                // 注释加密 
                HSSFRow row;
                HSSFCell cell;
                Object value;
                rowList = new ArrayList<ArrayList<Object>>();
                for (int i = sheet.getFirstRowNum(), rowCount = 0; rowCount < sheet.getPhysicalNumberOfRows(); i++) {
                    row = sheet.getRow(i);
                    colList = new ArrayList<Object>();
                    if (row == null) {
                        // 注释加密 
                        if (i != sheet.getPhysicalNumberOfRows()) {// 判断是否是最后一行
                            rowList.add(colList);
                        }
                        continue;
                    } else {
                        rowCount++;
                    }
                    for (int j = row.getFirstCellNum(); j <= row.getLastCellNum(); j++) {
                        cell = row.getCell(j);
                        if (cell == null || cell.getCellType() == HSSFCell.CELL_TYPE_BLANK) {
                            // 注释加密 
                            if (j != row.getLastCellNum()) {// 判断是否是该行中最后一个单元格
                                colList.add("");
                            }
                            continue;
                        }
                        switch (cell.getCellType()) {
                            case XSSFCell.CELL_TYPE_STRING:
                                value = cell.getStringCellValue();
                                break;
                            case XSSFCell.CELL_TYPE_FORMULA:
                                switch (cell.getCachedFormulaResultType()) {
                                    case 0:
                                        value = String.valueOf(cell.getNumericCellValue());
                                        value = String.valueOf(cell.getNumericCellValue());
                                        value = nf.format(Double.parseDouble((String) value));
                                        break;
                                    case 1:
                                        value = String.valueOf(cell.getRichStringCellValue());
                                        value = String.valueOf(cell.getNumericCellValue());
                                        value = nf.format(Double.parseDouble((String) value));
                                        break;
                                    case 4:
                                        value = String.valueOf(cell.getBooleanCellValue());
                                        break;
                                    case 5:
                                        value = String.valueOf(cell.getErrorCellValue());
                                        break;
                                    default:
                                        value = cell.getCellFormula();
                                }
                                break;
                            case XSSFCell.CELL_TYPE_NUMERIC:
                                if ("@".equals(cell.getCellStyle().getDataFormatString())) {
                                    value = df.format(cell.getNumericCellValue());
                                } else if ("General".equals(cell.getCellStyle().getDataFormatString())) {
                                    value = nf.format(cell.getNumericCellValue());
                                } else {
                                    value = df.format(cell.getNumericCellValue());
                                }
                                break;
                            case XSSFCell.CELL_TYPE_BOOLEAN:
                                value = Boolean.valueOf(cell.getBooleanCellValue());
                                break;
                            case XSSFCell.CELL_TYPE_BLANK:
                                value = "";
                                break;
                            default:
                                value = cell.toString();
                        }
                        colList.add(value);
                    }
                    rowList.add(colList);
                }
                map.put(sheet.getSheetName(), rowList);
            }
            return map;
        } catch (Exception e) {
            return null;
        }
    }

    private static Map<String, ArrayList<ArrayList<Object>>> readExcel2007(File file) {
        try {
            Map<String, ArrayList<ArrayList<Object>>> map = new HashMap<>();
            ArrayList<ArrayList<Object>> rowList;
            ArrayList<Object> colList;
            XSSFWorkbook wb = new XSSFWorkbook(new FileInputStream(file));
            // 注释加密 
            for (int k = 0; k < wb.getNumberOfSheets(); k++) {
                XSSFSheet sheet = wb.getSheetAt(k);
                // 注释加密 
                XSSFRow row;
                XSSFCell cell;
                Object value;
                rowList = new ArrayList<ArrayList<Object>>();
                for (int i = sheet.getFirstRowNum(), rowCount = 0; rowCount < sheet.getPhysicalNumberOfRows(); i++) {
                    row = sheet.getRow(i);
                    colList = new ArrayList<Object>();
                    if (row == null) {
                        // 注释加密 
                        if (i != sheet.getPhysicalNumberOfRows()) {// 判断是否是最后一行
                            rowList.add(colList);
                        }
                        continue;
                    } else {
                        rowCount++;
                    }
                    for (int j = row.getFirstCellNum(); j <= row.getLastCellNum(); j++) {
                        cell = row.getCell(j);
                        if (cell == null || cell.getCellType() == HSSFCell.CELL_TYPE_BLANK) {
                            // 注释加密 
                            if (j != row.getLastCellNum()) {// 判断是否是该行中最后一个单元格
                                colList.add("");
                            }
                            continue;
                        }
                        switch (cell.getCellType()) {
                            case XSSFCell.CELL_TYPE_STRING:
                                value = cell.getStringCellValue();
                                break;
                            case XSSFCell.CELL_TYPE_NUMERIC:
                                if ("@".equals(cell.getCellStyle().getDataFormatString())) {
                                    value = df.format(cell.getNumericCellValue());
                                } else if ("General".equals(cell.getCellStyle().getDataFormatString())) {
                                    value = nf.format(cell.getNumericCellValue());
                                } else {
                                    value = sdf.format(HSSFDateUtil.getJavaDate(cell.getNumericCellValue()));
                                }
                                break;
                            case XSSFCell.CELL_TYPE_FORMULA:
                                switch (cell.getCachedFormulaResultType()) {
                                    case 0:
                                        value = String.valueOf(cell.getNumericCellValue());
                                        value = String.valueOf(cell.getNumericCellValue());
                                        value = nf.format(Double.parseDouble((String) value));
                                        break;
                                    case 1:
                                        value = String.valueOf(cell.getRichStringCellValue());
                                        /*value = String.valueOf(cell.getNumericCellValue());
                                        value = nf.format(Double.parseDouble((String) value));*/
                                        break;
                                    case 4:
                                        value = String.valueOf(cell.getBooleanCellValue());
                                        break;
                                    case 5:
                                        value = String.valueOf(cell.getErrorCellValue());
                                        break;
                                    default:
                                        value = cell.getCellFormula();
                                }
                                break;
                            case XSSFCell.CELL_TYPE_BOOLEAN:
                                // 注释加密 
                                value = Boolean.valueOf(cell.getBooleanCellValue());
                                break;
                            case XSSFCell.CELL_TYPE_BLANK:
                                value = "";
                                break;
                            default:
                                value = cell.toString();
                        }
                        colList.add(value);
                    }
                    rowList.add(colList);
                }
                // 注释加密 
                map.put(sheet.getSheetName(), rowList);
            }
            return map;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}