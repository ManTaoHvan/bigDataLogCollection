CREATE DEFINER=`root`@`%` PROCEDURE `hmt_card`()
begin
	-- =====================

	DELETE FROM hmt_card;

	-- =====================

	insert into  hmt_card(mykey,chinese,myvalue)
	SELECT
		"fipCount" as mykey,
		"今日采集设备数" as chinese ,
		count(fip) AS myvalue
	FROM syslog.collect_total
	WHERE createTime=curdate() ;

	-- =====================

	insert into  hmt_card(mykey,chinese,myvalue)
	SELECT
		"sysTypeCount" as mykey,
		"今日采集类型数" as chinese ,
		count(DISTINCT SUBSTRING_INDEX(SUBSTRING_INDEX(sysType,'/',2),'/',-1) ) AS myvalue
	FROM syslog.collect_total ;

	-- =====================

	insert into  hmt_card(mykey,chinese,myvalue)
	SELECT
		"departNameCount" as mykey,
		"今日采集部门数" as chinese ,
		count(DISTINCT departName) AS myvalue
	FROM syslog.collect_total ;

	-- =====================

	insert into  hmt_card(mykey,chinese,myvalue)
	SELECT
		"filesizeSum" as mykey,
		"今日采集大小MB" as chinese ,
		cast((MB0 + MB1 + MB2 + MB3) as SIGNED) as myvalue
	FROM (
				 SELECT
					 sum( if( fsize LIKE "%KB" ,  replace(fsize,"KB","")/ 1024 , 0 )  -- 没有计算结果就返回0
						 ) as MB1,
					 sum( if( fsize LIKE "%MB" ,  replace(fsize,"MB",""), 0 )
						 ) as MB2,
					 sum( if( fsize LIKE "%GB" ,  replace(fsize,"GB","") * 1024 , 0 )
						 )as MB3
				 FROM syslog.collect_total
			 ) as res1 ,
			 (
				 SELECT
					 IFNULL(sum( replace(fsize,"B","")/ 1024/ 1024) , 0) as MB0 -- 这个可能会返回空字符串,所以要用ifnull判断
				 FROM syslog.collect_total
				 where fsize not LIKE "%GB"  and fsize not LIKE "%MB"   and fsize not LIKE "%KB"
			 ) as res2 ;

	-- 调试  SELECT sum(replace(fsize,"KB",""))/1024 FROM syslog.collect_total WHERE fsize LIKE "%KB"
	-- 调试  SELECT sum(replace(fsize,"MB","")) FROM syslog.collect_total WHERE fsize LIKE "%MB"

	-- =====================
end