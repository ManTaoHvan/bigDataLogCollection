-- 这里函数名和表名取成了一致
create procedure  hmt_collect_total_7day()
  begin
      insert into hmt_collect_total_7day select * from   collect_total  WHERE createTime = date_format(curdate() ,'%Y%m%d') ;
      insert into  hmt_Timed SELECT now() ;
      insert into  hmt_Timed  select   count(*)  from collect_total  WHERE createTime = date_format(curdate() ,'%Y%m%d') ;
      -- 把单位统一为MB
      update   hmt_collect_total_7day  set   fsize = replace(fsize,"KB","")/1024 WHERE fsize LIKE "%KB" ;
      update   hmt_collect_total_7day  set   fsize = replace(fsize,"MB","") WHERE fsize LIKE "%MB" ;
      update   hmt_collect_total_7day  set   fsize = replace(fsize,"GB","")*1024 WHERE fsize LIKE "%GB" ;
      update   hmt_collect_total_7day  set   fsize = replace(fsize,"B","")/1024/1024 WHERE fsize LIKE "%B" ;
      DELETE from hmt_collect_total_7day WHERE datediff( date_format(curdate() ,'%Y-%m-%d') ,date_format(createTime ,'%Y-%m-%d')) >=7 ;
    end