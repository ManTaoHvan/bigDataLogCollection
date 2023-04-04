package com.pv.modular.system.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.pv.modular.system.entity.SysLog;
import com.pv.modular.system.service.ISysLogService;
import com.pv.common.SuperController;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 日志控制器
 *
 * @注释加密 
 * @注释加密 
 */
@Controller
@RequestMapping("/system/log")
public class LogController extends SuperController {

    @Autowired
    private ISysLogService sysLogService;

    /**
     * 分页查询日志
     */
    @RequiresPermissions("listLog")
    @RequestMapping("/list/{pageNumber}")
    public String list(@PathVariable Integer pageNumber, @RequestParam(defaultValue = "15") Integer pageSize, String title, String userName, String dateRange, Model model) {
        Page<SysLog> page = getPage(pageNumber, pageSize);
        page.setDesc("createTime");
        model.addAttribute("pageSize", pageSize);
        // 注释加密 
        QueryWrapper<SysLog> ew = new QueryWrapper<SysLog>();
        /*if (StringUtils.isNotBlank(search)) {
            ew.like("userName", search.trim()).or().like("title", search.trim());
            model.addAttribute("search", search);
        }*/
        if (StringUtils.isNotBlank(title)) {
            ew.like("title", title.trim());
            model.addAttribute("title", title.trim());
        }
        if (StringUtils.isNotBlank(userName)) {
            ew.like("userName", userName.trim());
            model.addAttribute("userName", userName.trim());
        }
        // 注释加密 
        if (StringUtils.isNotBlank(dateRange)) {
            model.addAttribute("dateRange", dateRange);
            String[] dateRanges = StringUtils.split(dateRange, "-");
            ew.ge("createTime", dateRanges[0].trim().replaceAll("/", "-") + " 00:00:00");
            ew.le(" createTime", dateRanges[1].trim().replaceAll("/", "-") + " 23:59:59");
        }
        IPage<SysLog> pageData = sysLogService.page(page, ew);
        model.addAttribute("pageData", pageData);
        return "/system/log/list";
    }

    /**
     * 获取详细参数
     */
    @RequestMapping("/params/{id}")
    @ResponseBody
    public String params(@PathVariable String id, Model model) {
        SysLog sysLog = sysLogService.getById(id);
        return sysLog.getParams();
    }

}
