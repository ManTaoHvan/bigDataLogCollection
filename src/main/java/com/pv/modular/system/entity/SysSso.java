package com.pv.modular.system.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;

import java.io.Serializable;

@TableName("sys_sso")
public class SysSso extends Model<SysSso> {
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(type = IdType.UUID)
    private String id;
    /**
     * 部门名称
     */
    @TableField(value = "url")
    private String url;
    /**
     * 描述
     */
    @TableField(value = "ssoDesc")
    private String ssoDesc;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getSsoDesc() {
        return ssoDesc;
    }

    public void setSsoDesc(String ssoDesc) {
        this.ssoDesc = ssoDesc;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

}
