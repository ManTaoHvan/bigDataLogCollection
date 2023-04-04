# 每天的23:59执行一次的完整的创建案例
create event event_hmt_collect_total_7day
  on schedule every 1 DAY
    starts DATE_ADD( DATE_ADD(CURDATE(), INTERVAL 23 HOUR), INTERVAL 59 MINUTE)
  do call hmt_collect_total_7day() #这里是调用其他函数
