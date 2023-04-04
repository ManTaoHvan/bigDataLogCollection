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
 * 用户表
 * </p>
 *
 * @注释加密 
 * @注释加密 
 */
@TableName("sys_user")
public class SysUser extends Model<SysUser> {

    public static final int _0 = 0;
    public static final int _1 = 1;
    private static final long serialVersionUID = 1L;
    /**
     * 主键
     */
    @TableId(type = IdType.UUID)
    private String id;
    /**
     * 用户名
     */
    @TableField(value = "userName")
    private String userName;
    /**
     * 密码
     */
    @TableField(value = "password")
    private String password;
    /**
     * 用户状态,1-启用,-1禁用
     */
    @TableField(value = "userState")
    private Integer userState;
    /**
     * 创建时间
     */
    @TableField(value = "createTime")
    private Date createTime;
    /**
     * 描述
     */
    @TableField(value = "userDesc")
    private String userDesc;
    /**
     * 头像
     */
    @TableField(value = "userImg")
    private String userImg;
    /**
     * 部门主键
     */
    @TableField(value = "deptId")
    private String deptId;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getUserState() {
        return userState;
    }

    public void setUserState(Integer userState) {
        this.userState = userState;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getUserDesc() {
        return userDesc;
    }

    public void setUserDesc(String userDesc) {
        this.userDesc = userDesc;
    }

    public String getUserImg() {
        return userImg;
    }

    public void setUserImg(String userImg) {
        this.userImg = userImg;
    }

    public String getDeptId() {
        return deptId;
    }

    public void setDeptId(String deptId) {
        this.deptId = deptId;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

}
