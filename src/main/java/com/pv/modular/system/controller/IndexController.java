package com.pv.modular.system.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pv.modular.collect.entity.CollecctTotalBean;
import com.pv.modular.collect.service.ICollectTotalService;
import com.pv.modular.system.entity.SysUser;
import com.pv.modular.system.service.ISysDeptService;
import com.pv.utils.ShiroUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 首页控制器
* @注释加密 
* @注释加密 
* @注释加密 
*
 */
@Controller
@RequestMapping("/")
public class IndexController {

    @Autowired
    private ISysDeptService sysDeptService;

    @Autowired
    private ICollectTotalService totalService;

    @RequestMapping({"","/","index"})
    public  String index(Model model, HttpServletRequest request, HttpServletResponse response){
        String DeptName="";
        SysUser user = ShiroUtil.getSessionUser();
        if (!user.getUserName().equals("admin")){
            DeptName=sysDeptService.getById(user.getDeptId()).getDeptName();
        }
        QueryWrapper<CollecctTotalBean> ew = new QueryWrapper<>();
        if (StringUtils.isNotBlank(DeptName)){
            ew.eq("departName",DeptName);
        }
        Integer totalNum = totalService.count(ew);//总设备数


        Integer totalPro = totalService.totalPro(DeptName);

        String totalLine = totalService.totalLine(DeptName);

        model.addAttribute("totalNum",totalNum);
        model.addAttribute("totalPro",totalPro);
        model.addAttribute("totalLine",totalLine);
		return "index";
    }  
}
