package com.pv.utils.Schedule;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;

import com.pv.config.MyServletContextListener;
import com.pv.modular.collect.entity.*;
import com.pv.modular.collect.service.*;
import com.pv.utils.CommonUtil;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import static com.pv.modular.collect.contorller.CheckController.makeSureRecord;
import static com.pv.modular.collect.contorller.CheckController.makeSureSoc;

/**
 * @注释加密 
 * @注释加密 
 * @注释加密 
 * @注释加密 
 */
@Component
@Configuration      // 注释加密 
@EnableScheduling   // 注释加密 
public class ScheduleTaskUtil {

    @Scheduled(cron = "20 12 * * * ?")//
    private void setLogOne(){
        System.out.println("****start****");
        List<CollecctTotalBean> totalBeans = MyServletContextListener.getBean(ICollectTotalService.class)
                .logList("","", CommonUtil.getTodayDay());
        MyServletContextListener.getBean(ICollectTotalService.class).remove(null);
        MyServletContextListener.getBean(ICollectTotalService.class).saveBatch(totalBeans);
        System.out.println("****end****");
    }

    @Scheduled(cron = "20 30 05,15 * * ?")//
    private void removeError(){
        System.out.println("****start****");
        List<CollecctTotalBean> logList =  MyServletContextListener.getBean(ICollectTotalService.class).list(null);//

        List<CollecctRecordBean> recordBeans = MyServletContextListener.getBean(ICollectRecordService.class).list(null);

        List<CollecctSocBean> socBeans = MyServletContextListener.getBean(ICollectSocService.class).list(null);

        List<CollecctRecordBean> tempReoords = new ArrayList<>();

        List<CollecctRecordBean> copyReoords = new ArrayList<>();
        copyReoords.addAll(recordBeans);

        for (CollecctTotalBean log:logList){
            if (makeSureSoc(log.getFip(),socBeans)){
                if (!makeSureRecord(log.getFip(),recordBeans)){
                    // 注释加密 
                    List<CollecctSocBean> socs= MyServletContextListener.getBean(ICollectSocService.class).list(new QueryWrapper<CollecctSocBean>().like("ips",log.getFip()+","));
                    for (CollecctSocBean soc:socs){
                        List<CollecctRecordBean> recordList=MyServletContextListener.getBean(ICollectRecordService.class).list(new QueryWrapper<CollecctRecordBean>().eq("ips",soc.getIps()+","));
                        if (null==recordList || recordList.size()==0){
                            MyServletContextListener.getBean(ICollectRecordService.class).save(new CollecctRecordBean(soc.getSocip(),soc.getIps(),soc.getSysType(),soc.getProName(),
                                    soc.getDepartName(),log.getCip(),CommonUtil.getTodayDay()));
                        }
                    }
                }
            }else {
                // 注释加密 
                List<CollecctRecordBean> records = MyServletContextListener.getBean(ICollectRecordService.class).list(new QueryWrapper<CollecctRecordBean>().like("ips",log.getFip()+","));
                if (null==records || records.size()==0){
                    List<CollecctNoneBean> noneBeans = MyServletContextListener.getBean(ICollectNoneService.class).list(new QueryWrapper<CollecctNoneBean>().like("ips",log.getFip()+","));
                    if (null==noneBeans || noneBeans.size()==0){
                        MyServletContextListener.getBean(ICollectNoneService.class).save(new CollecctNoneBean(log.getFip(),log.getFip()+",",null,null,
                                null,log.getCip(),CommonUtil.getTodayDay()));
                    }
                }else{//用record表中的数据更新
                    for (CollecctRecordBean re:records){
                        List<CollecctNoneBean> noneBeans = MyServletContextListener.getBean(ICollectNoneService.class).list(new QueryWrapper<CollecctNoneBean>().like("ips",re.getSocip()+","));
                        if (null!=noneBeans && noneBeans.size()!=0){
                            MyServletContextListener.getBean(ICollectNoneService.class).remove(new QueryWrapper<CollecctNoneBean>().like("ips",re.getSocip()+","));
                        }
                        MyServletContextListener.getBean(ICollectNoneService.class).save(new CollecctNoneBean(re.getSocip(),re.getIps(),re.getSysType(),re.getProName(),
                                re.getDepartName(),re.getCip(),CommonUtil.getTodayDay()));
                    }
                }
            }

            tempReoords.addAll(MyServletContextListener.getBean(ICollectRecordService.class).list(new QueryWrapper<CollecctRecordBean>().like("ips",log.getFip()+",")));
        }


        System.out.println("00000*****"+tempReoords.size());
        System.out.println("11111*****"+copyReoords.size());

        copyReoords.removeAll(tempReoords);

        Iterator<CollecctRecordBean> it= copyReoords.iterator();
        while (it.hasNext()){
            CollecctRecordBean bean = it.next();
            if (makeSureRecord(bean.getSocip(),tempReoords)){
                it.remove();
            }
        }

        System.out.println("22222*****"+copyReoords.size());

        for (CollecctRecordBean bean: copyReoords){
            List<CollecctOffLineBean> offLineBeans = MyServletContextListener.getBean(ICollectOffLineService.class).list(new QueryWrapper<CollecctOffLineBean>()
                    .like("ips",bean.getSocip()+","));
            if (null==offLineBeans || offLineBeans.size()==0){
                MyServletContextListener.getBean(ICollectOffLineService.class).save(new CollecctOffLineBean(bean.getSocip(),bean.getIps(),bean.getSysType(),bean.getProName(),
                        bean.getDepartName(),bean.getCip(),1, CommonUtil.getTodayDay(),CommonUtil.getTodayDay()));
            }else {
                for (CollecctOffLineBean off:offLineBeans){
                    off.setUpdateTime(CommonUtil.getTodayDay());
                    off.setOffDays(CommonUtil.getDiffDays(off.getUpdateTime(), off.getCreateTime()));
                    MyServletContextListener.getBean(ICollectOffLineService.class).updateById(off);
                }
            }
        }
        System.out.println("****end****");
    }


    @Scheduled(cron = "30 40 * * * ?")//
    private void checkOffLine(){
        System.out.println("****start-checkOffline****");
        List<CollecctTotalBean> totalBeans = MyServletContextListener.getBean(ICollectTotalService.class).list(null);
        for (CollecctTotalBean bean:totalBeans){
            List<CollecctOffLineBean> offLineBeans = MyServletContextListener.getBean(ICollectOffLineService.class)
                    .list(new QueryWrapper<CollecctOffLineBean>().eq("socip",bean.getFip()));
            if (offLineBeans!=null && offLineBeans.size()>0){
                MyServletContextListener.getBean(ICollectOffLineService.class)
                        .remove(new QueryWrapper<CollecctOffLineBean>().eq("socip",bean.getFip()));
            }
        }
        System.out.println("****end-checkOffline****");
    }


}
