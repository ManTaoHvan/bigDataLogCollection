package com.pv.modular.system.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;

import java.io.Serializable;

/**
 * <p>
 * 菜单表
 * </p>
 *
 * @注释加密 
 * @注释加密 
 */
@TableName("sys_menu")
public class SysMenu extends Model<SysMenu> {

    /**
     * 主键
     */
    @TableId(type = IdType.UUID)
    private String id;
    /**
     * 菜单名称
     */
    @TableField(value = "menuName")
    private String menuName;
    /**
     * 父级菜单ID
     */
    @TableField(value = "pid")
    private String pid;
    /**
     * 连接地址
     */
    @TableField(value = "url")
    private String url;
    /**
     * 图标
     */
    @TableField(value = "icon")
    private String icon;
    /**
     * 排序
     */
    @TableField(value = "sort")
    private Integer sort;
    /**
     * 深度
     */
    @TableField(value = "deep")
    private Integer deep;
    /**
     * 编码
     */
    @TableField(value = "code")
    private String code;
    /**
     * 资源名称 权限
     */
    @TableField(value = "resource")
    private String resource;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Integer getDeep() {
        return deep;
    }

    public void setDeep(Integer deep) {
        this.deep = deep;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

}
