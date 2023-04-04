package com.pv.modular.collect.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;

import java.io.Serializable;

/**
 * @注释加密 
 * @注释加密 
 * @注释加密 
 * @注释加密 
 */
@TableName("collect_log")
public class CollecctBean extends Model<CollecctBean> {
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(type = IdType.UUID)
    private String id;

    @TableField("sip")
    private String sip;//设备IP

    @TableField("fname")
    private String fname;//日志文件名

    @TableField("fip")
    private String fip;//日志IP

    @TableField("fsize")
    private String fsize;//日志大小

    @TableField("fnum")
    private Long fnum;//日志行数

    @TableField("createTime")
    private String createTime;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSip() {
        return sip;
    }

    public void setSip(String sip) {
        this.sip = sip;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getFip() {
        return fip;
    }

    public void setFip(String fip) {
        this.fip = fip;
    }

    public String getFsize() {
        return fsize;
    }

    public void setFsize(String fsize) {
        this.fsize = fsize;
    }

    public Long getFnum() {
        return fnum;
    }

    public void setFnum(Long fnum) {
        this.fnum = fnum;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }
}
