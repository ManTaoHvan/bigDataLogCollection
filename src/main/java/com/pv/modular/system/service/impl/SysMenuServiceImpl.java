package com.pv.modular.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import com.pv.modular.system.entity.SysMenu;
import com.pv.modular.system.entity.TreeMenu;
import com.pv.modular.system.entity.TreeMenuAllowAccess;
import com.pv.modular.system.mapper.SysMenuMapper;
import com.pv.modular.system.mapper.SysRoleMenuMapper;
import com.pv.modular.system.service.ISysMenuService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * SysMenu 表数据服务层接口实现类
 */
@Service
@Transactional
public class SysMenuServiceImpl extends ServiceImpl<SysMenuMapper, SysMenu> implements ISysMenuService {
    /**
     * 菜单服务
     */
    @Resource
    private SysMenuMapper sysMenuMapper;
    /**
     * 角色菜单关系服务
     */
    @Resource
    private SysRoleMenuMapper sysRoleMenuMapper;

    @Cacheable(value = "permissionCache", key = "#uid")
    @Override
    public List<String> selectMenuIdsByUserId(String uid) {
        // 注释加密 
        return sysMenuMapper.selectMenuIdsByUserId(uid);
    }

    @Cacheable(value = "menuCache", key = "#uid")
    @Override
    public List<TreeMenu> selectTreeMenuByUserId(String uid) {
        // 注释加密 
        /**
         * 当前用户二级菜单权限
         */
        List<String> menuIds = sysRoleMenuMapper.selectRoleMenuIdsByUserId(uid);
        return selectTreeMenuByMenuIdsAndPid(menuIds, "0");
    }

    @Override
    public List<TreeMenu> selectTreeMenuByMenuIdsAndPid(final List<String> menuIds, String pid) {
        // 注释加密 
        QueryWrapper<SysMenu> ew = new QueryWrapper<SysMenu>();
        ew.orderByAsc("sort");
        ew.eq("pid", pid);
        ew.in("id", menuIds.size() > 0 ? menuIds : Lists.newArrayList(RandomStringUtils.randomNumeric(30)));
        List<SysMenu> sysMenus = this.list(ew);
        List<TreeMenu> treeMenus = new ArrayList<TreeMenu>();
        for (SysMenu sysMenu : sysMenus) {
            TreeMenu treeMenu = new TreeMenu();
            treeMenu.setSysMenu(sysMenu);
            if (sysMenu.getDeep() < 2) {
                treeMenu.setChildren(selectTreeMenuByMenuIdsAndPid(menuIds, sysMenu.getId()));
            }
            treeMenus.add(treeMenu);
        }
        return treeMenus;
    }

    @Override
    public List<TreeMenuAllowAccess> selectTreeMenuAllowAccessByMenuIdsAndPid(
            final List<String> menuIds, String pid) {
        // 注释加密 
        QueryWrapper<SysMenu> ew = new QueryWrapper<SysMenu>();
        ew.orderByAsc("sort");
        ew.eq("pid", pid);
        List<SysMenu> sysMenus = this.list(ew);
        List<TreeMenuAllowAccess> treeMenuAllowAccessList = new ArrayList<TreeMenuAllowAccess>();
        for (SysMenu sysMenu : sysMenus) {
            TreeMenuAllowAccess treeMenuAllowAccess = new TreeMenuAllowAccess();
            treeMenuAllowAccess.setSysMenu(sysMenu);
            /**
             * 是否有权限
             */
            if (menuIds.contains(sysMenu.getId())) {
                treeMenuAllowAccess.setAllowAccess(true);
            }
            /**
             * 子节点
             */
            if (sysMenu.getDeep() < 3) {
                treeMenuAllowAccess.setChildren(selectTreeMenuAllowAccessByMenuIdsAndPid(menuIds, sysMenu.getId()));
            }
            treeMenuAllowAccessList.add(treeMenuAllowAccess);
        }
        return treeMenuAllowAccessList;
    }

}