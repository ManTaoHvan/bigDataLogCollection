package com.pv.modular.collect.contorller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pv.common.SuperController;
import com.pv.config.MyServletContextListener;
import com.pv.modular.collect.entity.*;
import com.pv.modular.collect.mapper.CollectTotalMapper;
import com.pv.modular.collect.service.*;
import com.pv.utils.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Controller
@RequestMapping("/check")
public class CheckController  extends SuperController{

    @Autowired
    private ICollectService collectService;

    @Autowired
    private ICollectRecordService recordService;

    @Autowired
    private ICollectSocService socService;

    @Autowired
    private ICollectNoneService noneService;

    @Autowired
    private ICollectOffLineService offLineService;

    @Autowired
    private ICollectTotalService totalService;

    @ResponseBody
    @RequestMapping("/do")
    public String check(){
        List<CollecctTotalBean> logList =  totalService.list(null);//

        List<CollecctRecordBean> recordBeans = recordService.list(null);

        List<CollecctSocBean> socBeans = socService.list(null);

        List<CollecctRecordBean> tempReoords = new ArrayList<>();

        List<CollecctRecordBean> copyReoords = new ArrayList<>();
        copyReoords.addAll(recordBeans);

        for (CollecctTotalBean log:logList){
            if (makeSureSoc(log.getFip(),socBeans)){
                if (!makeSureRecord(log.getFip(),recordBeans)){
                    // 注释加密 
                    List<CollecctSocBean> socs= socService.list(new QueryWrapper<CollecctSocBean>().like("ips",log.getFip()+","));
                    for (CollecctSocBean soc:socs){
                        List<CollecctRecordBean> recordList=recordService.list(new QueryWrapper<CollecctRecordBean>().eq("ips",soc.getIps()+","));
                        if (null==recordList || recordList.size()==0){
                            recordService.save(new CollecctRecordBean(soc.getSocip(),soc.getIps(),soc.getSysType(),soc.getProName(),
                                    soc.getDepartName(),log.getCip(),CommonUtil.getTodayDay()));
                        }
                    }
                }
            }else {
                // 注释加密 
                List<CollecctRecordBean> records = recordService.list(new QueryWrapper<CollecctRecordBean>().like("ips",log.getFip()+","));
                if (null==records || records.size()==0){
                    List<CollecctNoneBean> noneBeans = noneService.list(new QueryWrapper<CollecctNoneBean>().like("ips",log.getFip()+","));
                    if (null==noneBeans || noneBeans.size()==0){
                        noneService.save(new CollecctNoneBean(log.getFip(),log.getFip()+",",null,null,
                                null,log.getCip(),CommonUtil.getTodayDay()));
                    }
                }else{//用record表中的数据更新
                    for (CollecctRecordBean re:records){
                        List<CollecctNoneBean> noneBeans = noneService.list(new QueryWrapper<CollecctNoneBean>().like("ips",re.getSocip()+","));
                        if (null!=noneBeans && noneBeans.size()!=0){
                            noneService.remove(new QueryWrapper<CollecctNoneBean>().like("ips",re.getSocip()+","));
                        }
                        noneService.save(new CollecctNoneBean(re.getSocip(),re.getIps(),re.getSysType(),re.getProName(),
                                re.getDepartName(),re.getCip(),CommonUtil.getTodayDay()));
                    }
                }
            }

            tempReoords.addAll(recordService.list(new QueryWrapper<CollecctRecordBean>().like("ips",log.getFip()+",")));
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
            List<CollecctOffLineBean> offLineBeans = offLineService.list(new QueryWrapper<CollecctOffLineBean>()
                    .like("ips",bean.getSocip()+","));
            if (null==offLineBeans || offLineBeans.size()==0){
                offLineService.save(new CollecctOffLineBean(bean.getSocip(),bean.getIps(),bean.getSysType(),bean.getProName(),
                        bean.getDepartName(),bean.getCip(),1, CommonUtil.getTodayDay(),CommonUtil.getTodayDay()));
            }else {
                for (CollecctOffLineBean off:offLineBeans){
                    off.setUpdateTime(CommonUtil.getTodayDay());
                    off.setOffDays(CommonUtil.getDiffDays(off.getUpdateTime(), off.getCreateTime()));
                    offLineService.updateById(off);
                }
            }
        }
        return "success";
    }


    public static Boolean makeSureRecord(String ip, List<CollecctRecordBean> recordBeans){
        for (CollecctRecordBean bean:recordBeans){
            if (bean.getIps().contains(ip+",")){
                return true;
            }
        }
        return false;
    }

    public static Boolean makeSureSoc(String ip, List<CollecctSocBean> socBeans){
        for (CollecctSocBean bean:socBeans){
            if (bean.getIps().contains(ip+",")){
                return true;
            }
        }
        return false;
    }

    @ResponseBody
    @RequestMapping("/doAll")
    public String doAll(){
        List<CollecctTotalBean> logList =  MyServletContextListener.getBean(CollectTotalMapper.class).logAll();//

        List<CollecctRecordBean> recordBeans = recordService.list(null);

        List<CollecctSocBean> socBeans = socService.list(null);


        for (CollecctTotalBean log:logList){
            if (makeSureSoc(log.getFip(),socBeans)){
                if (!makeSureRecord(log.getFip(),recordBeans)){
                    // 注释加密 
                    List<CollecctSocBean> socs= socService.list(new QueryWrapper<CollecctSocBean>().like("ips",log.getFip()+","));
                    for (CollecctSocBean soc:socs){
                        List<CollecctRecordBean> recordList=recordService.list(new QueryWrapper<CollecctRecordBean>().eq("ips",soc.getIps()+","));
                        if (null==recordList || recordList.size()==0){
                            recordService.save(new CollecctRecordBean(soc.getSocip(),soc.getIps(),soc.getSysType(),soc.getProName(),
                                    soc.getDepartName(),log.getCip(),CommonUtil.getTodayDay()));
                        }
                    }
                }
            }else {
                // 注释加密 
                List<CollecctRecordBean> records = recordService.list(new QueryWrapper<CollecctRecordBean>().like("ips",log.getFip()+","));
                if (null==records || records.size()==0){
                    List<CollecctNoneBean> noneBeans = noneService.list(new QueryWrapper<CollecctNoneBean>().like("ips",log.getFip()+","));
                    if (null==noneBeans || noneBeans.size()==0){
                        noneService.save(new CollecctNoneBean(log.getFip(),log.getFip()+",",null,null,
                                null,log.getCip(),CommonUtil.getTodayDay()));
                    }
                }else{//用record表中的数据更新
                    for (CollecctRecordBean re:records){
                        List<CollecctNoneBean> noneBeans = noneService.list(new QueryWrapper<CollecctNoneBean>().like("ips",re.getSocip()+","));
                        if (null!=noneBeans && noneBeans.size()!=0){
                            noneService.remove(new QueryWrapper<CollecctNoneBean>().like("ips",re.getSocip()+","));
                        }
                        noneService.save(new CollecctNoneBean(re.getSocip(),re.getIps(),re.getSysType(),re.getProName(),
                                re.getDepartName(),re.getCip(),CommonUtil.getTodayDay()));
                    }
                }
            }
        }




        return "success";



    }


}
