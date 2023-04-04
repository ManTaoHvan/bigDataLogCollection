package com.pv.modular.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.pv.modular.system.entity.SysRoleMenu;
import com.pv.modular.system.mapper.SysMenuMapper;
import com.pv.modular.system.mapper.SysRoleMenuMapper;
import com.pv.modular.system.service.ISysRoleMenuService;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * SysRoleMenu 表数据服务层接口实现类
 */
@Service
@Transactional
public class SysRoleMenuServiceImpl extends ServiceImpl<SysRoleMenuMapper, SysRoleMenu> implements ISysRoleMenuService {

    @Resource
    private SysMenuMapper sysMenuMapper;

    @Override
    public void addAuth(String roleId, String[] menuIds) {
        // 注释加密 

        /**
         * 删除原有权限
         */
        this.remove(new QueryWrapper<SysRoleMenu>().eq("roleId", roleId));
        /**
         * 重新授权
         */
        if (ArrayUtils.isNotEmpty(menuIds)) {
            for (String menuId : menuIds) {
                SysRoleMenu sysRoleMenu2 = new SysRoleMenu();
                sysRoleMenu2.setRoleId(roleId);
                sysRoleMenu2.setMenuId(menuId);
                this.save(sysRoleMenu2);
            }
        }
    }

    @Override
    public List<SysRoleMenu> selectByRole(String roleId) {
        // 注释加密 
        QueryWrapper<SysRoleMenu> ew = new QueryWrapper<SysRoleMenu>();
        ew.eq("roleId", roleId);
        return this.list(ew);

    }

    @Override
    public Set<String> findMenusByUid(String id) {
        // 注释加密 
        List<String> list = sysMenuMapper.selectResourceByUid(id);
        return new HashSet<>(list);
    }

}