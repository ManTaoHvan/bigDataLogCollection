package com.pv.modular.system.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pv.modular.system.entity.SysDept;
import com.pv.modular.system.mapper.SysDeptMapper;
import com.pv.modular.system.service.ISysDeptService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * SysDept 表数据服务层接口实现类
 *
 */
@Service
@Transactional
public class SysDeptServiceImpl extends ServiceImpl<SysDeptMapper, SysDept> implements ISysDeptService {

}