package com.pv.modular.system.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.pv.modular.system.entity.SysUserRole;

import java.util.Set;

/**
 * SysUserRole 表数据服务层接口
 */
public interface ISysUserRoleService extends IService<SysUserRole> {

    /**
     * 获取用户的角色
     *
     * @注释加密 
     * @注释加密 
     */
    Set<String> findRolesByUid(String uid);
}