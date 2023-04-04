package com.pv.modular.system.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pv.modular.system.entity.SysSso;
import com.pv.modular.system.mapper.SysSsoMapper;
import com.pv.modular.system.service.ISysSsoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * SysSso 表数据服务层接口实现类
 */
@Service
@Transactional
public class SysSsoServiceImpl extends ServiceImpl<SysSsoMapper, SysSso> implements ISysSsoService {

}