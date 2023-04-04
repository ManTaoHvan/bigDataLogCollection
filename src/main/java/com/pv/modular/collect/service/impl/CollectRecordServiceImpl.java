package com.pv.modular.collect.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pv.modular.collect.entity.CollecctRecordBean;
import com.pv.modular.collect.mapper.CollectRecordMapper;
import com.pv.modular.collect.service.ICollectRecordService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * WeatherBean 表数据服务层接口实现类
 *
 */
@Service
@Transactional
public class CollectRecordServiceImpl extends ServiceImpl<CollectRecordMapper, CollecctRecordBean> implements ICollectRecordService {

}