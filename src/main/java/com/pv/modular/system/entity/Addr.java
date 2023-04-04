package com.pv.modular.system.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;

import java.io.Serializable;

/**
 * <p>
 * 部门表
 * </p>
 *
 * @注释加密 
 * @注释加密 
 */
@TableName("inverter")
public class Addr extends Model<Addr> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(type = IdType.UUID)
    private String id;
    /**
     * 部门名称
     */ // 注释加密  // 注释加密 
    /**
     * 描述
     */
    @TableField(value = "inverter_addr")
    private String inverter_addr;

    @TableField(value = "inverter_id")
    private String inverter_id;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getInverter_addr() {
        return inverter_addr;
    }

    public void setInverter_addr(String inverter_addr) {
        this.inverter_addr = inverter_addr;
    }

    public String getInverter_id() {
        return inverter_id;
    }

    public void setInverter_id(String inverter_id) {
        this.inverter_id = inverter_id;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

}
