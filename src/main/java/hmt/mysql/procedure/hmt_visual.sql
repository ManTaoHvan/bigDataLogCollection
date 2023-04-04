CREATE DEFINER=`root`@`%` PROCEDURE `hmt_visual`()
begin
	--  ==================================  首先删除之前的旧数据
	DELETE FROM hmt_visual;

	-- ==================================
	-- 在hmt_collect_total_7day表(日志采集表里面存放的是7天数据)统计 采集的各类日志大小
	insert into  hmt_visual(mykey,chinese,myvalue)
	SELECT
		"sysTypeGroup" as mykey,
		concat(SUBSTRING_INDEX(SUBSTRING_INDEX(sysType,'/',2),'/',-1),"")  as chinese,
		round( sum( fsize ),3 ) as myvalue
	from hmt_collect_total_7day
	GROUP BY  SUBSTRING_INDEX(SUBSTRING_INDEX(sysType,'/',2),'/',-1) ;


	-- ==================================
	-- 在hmt_collect_total_7day表(日志采集表里面存放的是7天数据)统计 采集的各公司部门日志大小

	insert into  hmt_visual(mykey,chinese,myvalue)
	SELECT
		"departGroup" as mykey,
		concat(departName,"")  as chinese,
		round( sum( fsize ),3 ) as myvalue
	from hmt_collect_total_7day
	GROUP BY  departName ;


	-- ==================================
	-- 在hmt_collect_total_7day表(日志采集表里面存放的是7天数据)统计 采集的文件大小增长情况

	insert into  hmt_visual(mykey,chinese,myvalue)
	SELECT
		"dateGroup" as mykey,
		SUBSTR(concat(createTime,""),5)  as chinese,
		round( sum( fsize ),3 ) as myvalue
	from hmt_collect_total_7day
	GROUP BY  createTime ;

end