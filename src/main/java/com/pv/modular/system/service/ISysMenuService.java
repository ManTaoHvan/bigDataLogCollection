package com.pv.modular.system.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.pv.modular.system.entity.SysMenu;
import com.pv.modular.system.entity.TreeMenu;
import com.pv.modular.system.entity.TreeMenuAllowAccess;

import java.util.List;

/**
 * SysMenu 表数据服务层接口
 */
public interface ISysMenuService extends IService<SysMenu> {

    /**
     * 获取指定用户拥有的菜单
     */
    List<String> selectMenuIdsByUserId(String uid);

    /**
     * 获取指定用户的菜单
     *
     * @注释加密 
     * @注释加密 
     */
    List<TreeMenu> selectTreeMenuByMenuIdsAndPid(List<String> menuIds, String pid);

    /**
     * 获取当前用户的菜单
     */
    List<TreeMenu> selectTreeMenuByUserId(String uid);

    /**
     * 获取指定用户拥有权限
     *
     * @注释加密 
     * @注释加密 
     */
    List<TreeMenuAllowAccess> selectTreeMenuAllowAccessByMenuIdsAndPid(List<String> menuIds, String pid);

}