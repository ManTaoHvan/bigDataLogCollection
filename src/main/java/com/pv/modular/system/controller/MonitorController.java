package com.pv.modular.system.controller;

import com.pv.common.SuperController;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 监控
 *
 * @注释加密 
 * @注释加密 
 */
@Controller
@RequestMapping("/system/monitor")
public class MonitorController extends SuperController {

    /**
     * 系统监控列表
     */
    @RequiresPermissions("monitorList")
    @RequestMapping("/list")
    public String list(Model model) {
        return "/system/monitor/list";
    }

}
