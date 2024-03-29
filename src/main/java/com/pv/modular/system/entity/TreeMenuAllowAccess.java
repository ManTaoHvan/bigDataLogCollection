package com.pv.modular.system.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 菜单树+是否有权限表示
 *
 * @注释加密 
 * @注释加密 
 */
public class TreeMenuAllowAccess implements Serializable {

    /**
     * 菜单
     */
    private SysMenu sysMenu;
    /**
     * 是否允许访问
     */
    private boolean allowAccess = false;
    /**
     * 子菜单
     */
    private List<TreeMenuAllowAccess> children = new ArrayList<TreeMenuAllowAccess>();

    public SysMenu getSysMenu() {
        return sysMenu;
    }

    public void setSysMenu(SysMenu sysMenu) {
        this.sysMenu = sysMenu;
    }

    public boolean isAllowAccess() {
        return allowAccess;
    }

    public void setAllowAccess(boolean allowAccess) {
        this.allowAccess = allowAccess;
    }

    public List<TreeMenuAllowAccess> getChildren() {
        return children;
    }

    public void setChildren(List<TreeMenuAllowAccess> children) {
        this.children = children;
    }

}
