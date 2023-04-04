package com.pv.modular.system.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pv.modular.system.entity.SysUserRole;

import java.util.List;

/**
 * SysUserRole 表数据库控制层接口
 */
public interface SysUserRoleMapper extends BaseMapper<SysUserRole> {

    List<String> selectPermissionByUid(String uid);

}