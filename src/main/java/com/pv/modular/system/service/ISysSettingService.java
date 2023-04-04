package com.pv.modular.system.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.pv.modular.system.entity.SysSetting;

import java.util.List;

/**
 * SysSetting 表数据服务层接口
 */
public interface ISysSettingService extends IService<SysSetting> {

    List<SysSetting> findAll();

}