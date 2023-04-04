package com.pv.modular.system.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 角色表
 * </p>
 *
 * @注释加密 
 * @注释加密 
 */
@TableName("sys_role")
public class SysRole extends Model<SysRole> {

    /**
     * 主键
     */
    @TableId(type = IdType.UUID)
    private String id;
    /**
     * 角色名称
     */
    @TableField(value = "roleName")
    private String roleName;
    /**
     * 角色描述
     */
    @TableField(value = "roleDesc")
    private String roleDesc;
    /**
     * 状态,1-启用,-1禁用
     */
    @TableField(value = "roleState")
    private Integer roleState;
    /**
     * 创建时间
     */
    @TableField(value = "createTime")
    private Date createTime;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleDesc() {
        return roleDesc;
    }

    public void setRoleDesc(String roleDesc) {
        this.roleDesc = roleDesc;
    }

    public Integer getRoleState() {
        return roleState;
    }

    public void setRoleState(Integer roleState) {
        this.roleState = roleState;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

}
