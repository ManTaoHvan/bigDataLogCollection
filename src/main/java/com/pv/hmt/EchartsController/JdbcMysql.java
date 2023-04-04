package com.pv.hmt.EchartsController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
 // 注释加密  // 注释加密  // 注释加密  // 注释加密 

@RestController
public class JdbcMysql {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @GetMapping("/mysql/getData/hmt_visual_sysTypeGroup")
    public List list1() {
        List<Map<String, Object>> maps = jdbcTemplate.queryForList(" SELECT chinese,myvalue from  hmt_visual WHERE mykey='sysTypeGroup'");
        Map<String, Object> map = maps.get(0);//map<字段,值>
        return maps;//返回map，但是使用json处理
    }

    @GetMapping("/mysql/getData/hmt_visual_departGroup")
    public List list2() {
        List<Map<String, Object>> maps = jdbcTemplate.queryForList(" SELECT chinese,myvalue from  hmt_visual WHERE mykey='departGroup'");
        Map<String, Object> map = maps.get(0);//map<字段,值>
        return maps;//返回map，但是使用json处理
    }

    @GetMapping("/mysql/getData/hmt_visual_dateGroup")
    public List list3() {
        List<Map<String, Object>> maps = jdbcTemplate.queryForList(" SELECT chinese,myvalue from  hmt_visual WHERE mykey='dateGroup'");
        Map<String, Object> map = maps.get(0);//map<字段,值>
        return maps;//返回map，但是使用json处理
    }

    @GetMapping("/mysql/getData/hmt_card_fipCount")
    public List list4() {
        List<Map<String, Object>> maps = jdbcTemplate.queryForList(" SELECT chinese,myvalue from  hmt_card WHERE mykey='fipCount'");
        Map<String, Object> map = maps.get(0);//map<字段,值>
        return maps;//返回map，但是使用json处理
    }

    @GetMapping("/mysql/getData/hmt_card_sysTypeCount")
    public List list5() {
        List<Map<String, Object>> maps = jdbcTemplate.queryForList(" SELECT chinese,myvalue from  hmt_card WHERE mykey='sysTypeCount'");
        Map<String, Object> map = maps.get(0);//map<字段,值>
        return maps;//返回map，但是使用json处理
    }

    @GetMapping("/mysql/getData/hmt_card_filesizeSum")
    public List list6() {
        List<Map<String, Object>> maps = jdbcTemplate.queryForList(" SELECT chinese,myvalue from  hmt_card WHERE mykey='filesizeSum'");
        Map<String, Object> map = maps.get(0);//map<字段,值>
        return maps;//返回map，但是使用json处理
    }

}
