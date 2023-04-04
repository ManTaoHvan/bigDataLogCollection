package com.pv.modular.collect.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pv.modular.collect.entity.CollecctBean;
import com.pv.modular.collect.entity.CollecctTotalBean;
import com.pv.modular.collect.mapper.CollectMapper;
import com.pv.modular.collect.service.ICollectService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * WeatherBean 表数据服务层接口实现类
 *
 */
@Service
@Transactional
public class CollectServiceImpl extends ServiceImpl<CollectMapper, CollecctBean> implements ICollectService {


}