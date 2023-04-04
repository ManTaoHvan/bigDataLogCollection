package com.pv.modular.collect.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.pv.modular.collect.entity.CollecctTotalBean;

import java.util.List;

/**
 * WeatherBean 表数据服务层接口
 */
public interface ICollectTotalService extends IService<CollecctTotalBean> {


    Page<CollecctTotalBean> logList(Page<CollecctTotalBean> page, String search, String ip, String createTime);

    List<CollecctTotalBean> logList(String search, String ip, String createTime);

    Integer totalPro(String departName);

    String totalLine(String departName);
}