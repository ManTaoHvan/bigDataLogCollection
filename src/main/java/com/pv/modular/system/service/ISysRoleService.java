package com.pv.modular.system.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.pv.modular.system.entity.SysRole;

import java.util.List;

/**
 * SysRole 表数据服务层接口
 */
public interface ISysRoleService extends IService<SysRole> {

    /**
     * 删除角色
     *
     * @注释加密 
     */
    void delete(String id);

    /**
     * 批量删除角色
     *
     * @注释加密 
     */
    void delete(List<String> ids);
}