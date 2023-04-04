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
@TableName("collect_total")
public class CollecctTotalBean extends Model<CollecctTotalBean> {
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(type = IdType.UUID)
    private String id;

    @TableField("fname")
    private String fname;//日志文件名

    @TableField("fip")
    private String fip;//日志IP

    @TableField("ips")
    private String ips;//日志IPs

    @TableField("fsize")
    private String fsize;//日志大小

    @TableField("fnum")
    private Long fnum;//日志行数

    @TableField("sysType")
    private String sysType;//设备类型

    @TableField("proName")
    private String proName;//所属项目名

    @TableField("departName")
    private String departName;//所属部门

    @TableField("cip")
    private String cip;//采集器ip

    @TableField("createTime")
    private String createTime;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getIps() {
        return ips;
    }

    public void setIps(String ips) {
        this.ips = ips;
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

    public String getSysType() {
        return sysType;
    }

    public void setSysType(String sysType) {
        this.sysType = sysType;
    }

    public String getProName() {
        return proName;
    }

    public void setProName(String proName) {
        this.proName = proName;
    }

    public String getDepartName() {
        return departName;
    }

    public void setDepartName(String departName) {
        this.departName = departName;
    }

    public String getCip() {
        return cip;
    }

    public void setCip(String cip) {
        this.cip = cip;
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
