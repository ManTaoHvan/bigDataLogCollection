package com.pv.modular.system.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.pv.modular.system.entity.SysUser;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * SysUser 表数据库控制层接口
 */
public interface SysUserMapper extends BaseMapper<SysUser> {

    List<Map<Object, Object>> selectUserList(Page<Map<Object, Object>> page, @Param("search") String search);
}