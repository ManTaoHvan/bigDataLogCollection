package com.pv;

import com.baomidou.mybatisplus.core.exceptions.MybatisPlusException;
import com.baomidou.mybatisplus.core.toolkit.StringPool;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.InjectionConfig;
import com.baomidou.mybatisplus.generator.config.*;
import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * @注释加密 
 * @注释加密 
 * @注释加密 
 */
public class CodeGenerator {

    /**
     * <p>
     * 读取控制台内容dddd
     * </p>
     */
    public static String scanner(String tip) {
        Scanner scanner = new Scanner(System.in);
        StringBuilder help = new StringBuilder();
        help.append("请输入" + tip + "：");
        System.out.println(help.toString());
        if (scanner.hasNext()) {
            String ipt = scanner.next();
            if (StringUtils.isNotEmpty(ipt)) {
                return ipt;
            }
        }
        throw new MybatisPlusException("请输入dd正确的" + tip + "！");
    }

    public static void main(String[] args) {
        // 注释加密 
        AutoGenerator mpg = new AutoGenerator();

        // 注释加密 
        GlobalConfig gc = new GlobalConfig();
        // 注释加密 
        String projectPath = "E:/tempCode";
        gc.setOutputDir(projectPath + "/src/main/java");
        gc.setAuthor("shu");
        gc.setOpen(false);
        mpg.setGlobalConfig(gc);

        // 注释加密 
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setUrl("jdbc:mysql://localhost:3306/pv?serverTimezone=UTC&characterEncoding=utf-8&useSSL=false&&zeroDateTimeBehavior=CONVERT_TO_NULL");
        // 注释加密 
        dsc.setDriverName("com.mysql.cj.jdbc.Driver");
        dsc.setUsername("root");
        dsc.setPassword("temp890!@#");
        mpg.setDataSource(dsc);

        // 注释加密 
        PackageConfig pc = new PackageConfig();
        pc.setModuleName(scanner("模块名"));
        pc.setParent("com.baomidou.ant");
        mpg.setPackageInfo(pc);

        // 注释加密 
        InjectionConfig cfg = new InjectionConfig() {
            @Override
            public void initMap() {
                // 注释加密 
            }
        };

        // 注释加密 
        String templatePath = "/templates/mapper.xml.ftl";
        // 注释加密 
        // 注释加密 

        // 注释加密 
        List<FileOutConfig> focList = new ArrayList<>();
        // 注释加密 
        focList.add(new FileOutConfig(templatePath) {
            @Override
            public String outputFile(TableInfo tableInfo) {
                // 注释加密 
                return projectPath + "/src/main/resources/mapper/" + pc.getModuleName()
                        + "/" + tableInfo.getEntityName() + "Mapper" + StringPool.DOT_XML;
            }
        });

        cfg.setFileOutConfigList(focList);
        mpg.setCfg(cfg);

        // 注释加密 
        TemplateConfig templateConfig = new TemplateConfig();

        // 注释加密 
        // 注释加密 
        // 注释加密 
        // 注释加密 

        templateConfig.setXml(null);
        mpg.setTemplate(templateConfig);

        // 注释加密 
        StrategyConfig strategy = new StrategyConfig();
        strategy.setNaming(NamingStrategy.underline_to_camel);
        strategy.setColumnNaming(NamingStrategy.underline_to_camel);
        strategy.setSuperEntityClass("com.baomidou.ant.common.BaseEntity");
        strategy.setEntityLombokModel(true);
        strategy.setRestControllerStyle(true);
        strategy.setSuperControllerClass("com.baomidou.ant.common.BaseController");
        strategy.setInclude(scanner("表名"));
        strategy.setSuperEntityColumns("id");
        strategy.setControllerMappingHyphenStyle(true);
        strategy.setTablePrefix(pc.getModuleName() + "_");
        mpg.setStrategy(strategy);
        mpg.setTemplateEngine(new FreemarkerTemplateEngine());
        mpg.execute();
    }

}

