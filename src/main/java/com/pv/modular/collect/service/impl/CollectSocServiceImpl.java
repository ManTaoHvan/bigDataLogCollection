package com.pv.modular.collect.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pv.modular.collect.entity.CollecctSocBean;
import com.pv.modular.collect.mapper.CollectSocMapper;
import com.pv.modular.collect.service.ICollectSocService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * WeatherBean 表数据服务层接口实现类
 *
 */
@Service
@Transactional
public class CollectSocServiceImpl extends ServiceImpl<CollectSocMapper, CollecctSocBean> implements ICollectSocService {

}