package com.pv.modular.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pv.modular.system.entity.SysUser;
import com.pv.modular.system.entity.SysUserRole;
import com.pv.modular.system.mapper.SysUserMapper;
import com.pv.modular.system.mapper.SysUserRoleMapper;
import com.pv.modular.system.service.ISysUserService;
import com.pv.utils.ShiroUtil;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.Map;

/**
 * SysUser 表数据服务层接口实现类
 */
@Service
@Transactional
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements ISysUserService {

    @Resource
    private SysUserMapper userMapper;

    @Resource
    private SysUserRoleMapper userRoleMapper;

    @Override
    public void insertUser(SysUser user, String[] roleIds) {
        // 注释加密 
        user.setCreateTime(new Date());
        user.setPassword(ShiroUtil.md51024Pwd(user.getPassword(), user.getUserName()));
        // 注释加密 
        userMapper.insert(user);
        // 注释加密 
        if (ArrayUtils.isNotEmpty(roleIds)) {
            for (String rid : roleIds) {
                SysUserRole sysUserRole = new SysUserRole();
                sysUserRole.setUserId(user.getId());
                sysUserRole.setRoleId(rid);
                userRoleMapper.insert(sysUserRole);
            }
        }
    }

    @Override
    public void updateUser(SysUser sysUser, String[] roleIds) {
        // 注释加密 
        if (StringUtils.isNotEmpty(sysUser.getPassword())){
            String password = ShiroUtil.md51024Pwd(sysUser.getPassword(), sysUser.getUserName());
            sysUser.setPassword(password);
        }else {
            String password = userMapper.selectById(sysUser).getPassword();
            sysUser.setPassword(password);
        }
        // 注释加密 
        userMapper.updateById(sysUser);
        // 注释加密 
        userRoleMapper.delete(new QueryWrapper<SysUserRole>().eq("userId", sysUser.getId()));
        // 注释加密 
        if (ArrayUtils.isNotEmpty(roleIds)) {
            for (String rid : roleIds) {
                SysUserRole sysUserRole = new SysUserRole();
                sysUserRole.setUserId(sysUser.getId());
                sysUserRole.setRoleId(rid);
                userRoleMapper.insert(sysUserRole);
            }
        }
    }

    @Override
    public Page<Map<Object, Object>> selectUserPage(Page<Map<Object, Object>> page, String search) {
        // 注释加密 
        page.setRecords(baseMapper.selectUserList(page, search));
        return page;
    }

    @Override
    public void delete(String id) {
        // 注释加密 
        this.removeById(id);
        userRoleMapper.delete(new QueryWrapper<SysUserRole>().eq("userId", id));
    }

}