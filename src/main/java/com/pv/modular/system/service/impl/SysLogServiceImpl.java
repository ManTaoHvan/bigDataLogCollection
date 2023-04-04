package com.pv.modular.system.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pv.modular.system.entity.SysLog;
import com.pv.modular.system.mapper.SysLogMapper;
import com.pv.modular.system.service.ISysLogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

/**
 * SysLog 表数据服务层接口实现类
 */
@Service
@Transactional
public class SysLogServiceImpl extends ServiceImpl<SysLogMapper, SysLog> implements ISysLogService {

    public static final Logger logger = LoggerFactory.getLogger(SysLogServiceImpl.class);

    @Override
    public void insertLog(String title, String userName, String url, String params) {
        // 注释加密 
        SysLog sysLog = new SysLog();
        sysLog.setCreateTime(new Date());
        sysLog.setTitle(title);
        sysLog.setUserName(userName);
        sysLog.setUrl(url);
        sysLog.setParams(params);
        super.save(sysLog);
        logger.debug("记录日志:" + sysLog.toString());
    }

}