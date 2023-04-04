package com.pv.modular.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pv.modular.system.entity.SysUserRole;
import com.pv.modular.system.mapper.SysUserRoleMapper;
import com.pv.modular.system.service.ISysUserRoleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * SysUserRole 表数据服务层接口实现类
 */
@Service
@Transactional
public class SysUserRoleServiceImpl extends ServiceImpl<SysUserRoleMapper, SysUserRole> implements ISysUserRoleService {

    @Override
    public Set<String> findRolesByUid(String uid) {
        // 注释加密 
        List<SysUserRole> list = this.list(new QueryWrapper<SysUserRole>().eq("userId", uid));
        Set<String> set = new HashSet<String>();
        for (SysUserRole ur : list) {
            set.add(ur.getRoleId());
        }
        return set;
    }
}