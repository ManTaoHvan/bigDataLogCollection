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
@TableName("collect_record")
public class CollecctRecordBean extends Model<CollecctRecordBean> {
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(type = IdType.UUID)
    private String id;

    @TableField("socip")
    private String socip;//soc ip

    @TableField("ips")
    private String ips;//所有ip

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

    public String getSocip() {
        return socip;
    }

    public void setSocip(String socip) {
        this.socip = socip;
    }

    public String getIps() {
        return ips;
    }

    public void setIps(String ips) {
        this.ips = ips;
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

    public CollecctRecordBean(String socip, String ips, String sysType, String proName, String departName, String cip, String createTime) {
        this.socip = socip;
        this.ips = ips;
        this.sysType = sysType;
        this.proName = proName;
        this.departName = departName;
        this.cip = cip;
        this.createTime = createTime;
    }

    public CollecctRecordBean(){

    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }
}
