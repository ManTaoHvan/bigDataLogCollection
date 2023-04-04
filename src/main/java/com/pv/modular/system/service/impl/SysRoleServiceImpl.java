package com.pv.modular.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pv.modular.system.entity.SysRole;
import com.pv.modular.system.entity.SysRoleMenu;
import com.pv.modular.system.entity.SysUserRole;
import com.pv.modular.system.mapper.SysRoleMapper;
import com.pv.modular.system.mapper.SysRoleMenuMapper;
import com.pv.modular.system.mapper.SysUserRoleMapper;
import com.pv.modular.system.service.ISysRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * SysRole 表数据服务层接口实现类
 */
@Service
@Transactional
public class SysRoleServiceImpl extends ServiceImpl<SysRoleMapper, SysRole> implements ISysRoleService {

    @Autowired
    private SysRoleMapper sysRoleMapper;

    @Autowired
    private SysRoleMenuMapper sysRoleMenuMapper;

    @Autowired
    private SysUserRoleMapper userRoleMapper;

    @Override
    public void delete(String id) {
        sysRoleMapper.deleteById(id);
        sysRoleMenuMapper.delete(new QueryWrapper<SysRoleMenu>().eq("roleId", id));
        userRoleMapper.delete(new QueryWrapper<SysUserRole>().eq("roleId", id));
    }

    @Override
    public void delete(List<String> ids) {
        sysRoleMapper.deleteBatchIds(ids);
        sysRoleMenuMapper.delete(new QueryWrapper<SysRoleMenu>().in("roleId", ids));
        userRoleMapper.delete(new QueryWrapper<SysUserRole>().in("roleId", ids));
    }

}