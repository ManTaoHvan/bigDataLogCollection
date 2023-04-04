package com.pv.modular.collect.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pv.modular.collect.entity.CollecctNoneBean;
import com.pv.modular.collect.mapper.CollectNoneMapper;
import com.pv.modular.collect.service.ICollectNoneService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * WeatherBean 表数据服务层接口实现类
 *
 */
@Service
@Transactional
public class CollectNoneServiceImpl extends ServiceImpl<CollectNoneMapper, CollecctNoneBean> implements ICollectNoneService {

}