package com.pv.modular.system.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 菜单树
 *
 * @注释加密 
 * @注释加密 
 */
public class TreeMenu implements Serializable {

    /**
     * 菜单
     */
    private SysMenu sysMenu;
    /**
     * 子菜单
     */
    private List<TreeMenu> children = new ArrayList<TreeMenu>();

    public SysMenu getSysMenu() {
        return sysMenu;
    }

    public void setSysMenu(SysMenu sysMenu) {
        this.sysMenu = sysMenu;
    }

    public List<TreeMenu> getChildren() {
        return children;
    }

    public void setChildren(List<TreeMenu> children) {
        this.children = children;
    }

}
