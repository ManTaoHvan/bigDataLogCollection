# 每天的23:59执行一次的完整的创建案例
create event event_hmt_card
   on schedule every 10 minute
  do call hmt_card() #这里是调用其他函数