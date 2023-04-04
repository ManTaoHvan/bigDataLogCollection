package com.pv.modular.collect.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pv.modular.collect.entity.CollecctOffLineBean;
import com.pv.modular.collect.mapper.CollectOffLineMapper;
import com.pv.modular.collect.service.ICollectOffLineService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * WeatherBean 表数据服务层接口实现类
 *
 */
@Service
@Transactional
public class CollectOffLineServiceImpl extends ServiceImpl<CollectOffLineMapper, CollecctOffLineBean> implements ICollectOffLineService {

}