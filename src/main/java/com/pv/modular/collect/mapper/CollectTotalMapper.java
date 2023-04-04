package com.pv.modular.collect.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.pv.modular.collect.entity.CollecctBean;
import com.pv.modular.collect.entity.CollecctTotalBean;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * WeatherBean 表数据库控制层接口
 */
public interface CollectTotalMapper extends BaseMapper<CollecctTotalBean> {

    List<CollecctTotalBean> logList(Page<CollecctTotalBean> page, @Param("search") String search,
                                    @Param("ip") String ip, @Param("createTime") String createTime);

    List<CollecctTotalBean> logList(@Param("search") String search,
                                    @Param("ip") String ip, @Param("createTime") String createTime);

    List<CollecctTotalBean> logAll();


    Integer totalPro(@Param("departName") String departName);

    String totalLine(@Param("departName") String departName);
}