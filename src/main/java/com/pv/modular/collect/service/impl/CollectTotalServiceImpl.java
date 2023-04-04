package com.pv.modular.collect.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pv.modular.collect.entity.CollecctBean;
import com.pv.modular.collect.entity.CollecctTotalBean;
import com.pv.modular.collect.mapper.CollectMapper;
import com.pv.modular.collect.mapper.CollectTotalMapper;
import com.pv.modular.collect.service.ICollectService;
import com.pv.modular.collect.service.ICollectTotalService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 *
 * WeatherBean 表数据服务层接口实现类
 *
 */
@Service
@Transactional
public class CollectTotalServiceImpl extends ServiceImpl<CollectTotalMapper, CollecctTotalBean> implements ICollectTotalService {

    @Override
    public Page<CollecctTotalBean> logList(Page<CollecctTotalBean> page, String search,String ip,String createTime) {
        page.setRecords(baseMapper.logList(page,search,ip,createTime));
        return page;
    }

    @Override
    public List<CollecctTotalBean> logList(String search, String ip, String createTime) {

        return baseMapper.logList(search,ip,createTime);
    }

    @Override
    public Integer totalPro(String departName) {
        return baseMapper.totalPro(departName);
    }

    @Override
    public String totalLine(String departName) {
        return baseMapper.totalLine(departName);
    }
}