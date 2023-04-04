package com.pv.modular.system.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pv.modular.system.entity.SysSetting;
import com.pv.modular.system.service.ISysSettingService;
import com.pv.common.SuperController;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.ArrayList;
import java.util.List;

/**
 * 系统设置控制器
 *
 * @注释加密 
 * @注释加密 
 */
@Controller
@RequestMapping("/system/setting")
public class SettingController extends SuperController {

    @Autowired
    private ISysSettingService sysSettingService;

    /**
     * 查询系统设置
     */
    @RequiresPermissions("listSetting")
    @RequestMapping("/page")
    public String page(Model model) {
        List<SysSetting> list = sysSettingService.list(new QueryWrapper<SysSetting>().orderBy(true, true, "sort"));
        model.addAttribute("list", list);
        return "/system/setting/page";
    }

    @RequiresPermissions("doSetting")
    @RequestMapping("/doSetting")
    public String doSetting(String[] id, String[] sysValue, Model model, RedirectAttributes redirectAttributes) {
        List<SysSetting> sysSettings = new ArrayList<SysSetting>();
        if (ArrayUtils.isNotEmpty(id)) {
            for (int i = 0; i < id.length; i++) {
                SysSetting setting = new SysSetting();
                setting.setId(id[i]);
                setting.setSysValue(sysValue[i]);
                sysSettings.add(setting);
            }
        }
        sysSettingService.updateBatchById(sysSettings);
        redirectAttributes.addFlashAttribute("info", "OK,更新成功!");
        return redirectTo("/system/setting/page");
    }

}
