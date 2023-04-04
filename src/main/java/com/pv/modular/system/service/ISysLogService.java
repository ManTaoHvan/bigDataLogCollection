package com.pv.modular.system.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.pv.modular.system.entity.SysLog;

/**
 * SysLog 表数据服务层接口
 */
public interface ISysLogService extends IService<SysLog> {

    /**
     * 记录日志
     *
     * @注释加密 
     * @注释加密 
     * @注释加密 
     * @注释加密 
     */
    void insertLog(String title, String uname, String url, String parms);


}