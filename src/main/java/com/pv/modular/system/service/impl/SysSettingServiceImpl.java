package com.pv.modular.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pv.modular.system.entity.SysSetting;
import com.pv.modular.system.mapper.SysSettingMapper;
import com.pv.modular.system.service.ISysSettingService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * SysSetting 表数据服务层接口实现类
 */
@Service
@Transactional
public class SysSettingServiceImpl extends ServiceImpl<SysSettingMapper, SysSetting> implements ISysSettingService {

    @Cacheable(value = "settingCache")
    @Override
    public List<SysSetting> findAll() {
        // 注释加密 
        return this.list(new QueryWrapper<SysSetting>().orderByAsc("sort"));
    }

}