package com.pv.modular.system.controller;

import com.pv.modular.system.entity.SysUser;
import com.pv.modular.system.service.ISysUserService;
import com.pv.utils.ShiroUtil;
import com.pv.common.SuperController;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * 用户中心控制器
 *
 * @注释加密 
 * @注释加密 
 */
@Controller
@RequestMapping("/system/me")
public class MeController extends SuperController {

    @Autowired
    private ISysUserService sysUserService;

    /**
     * 个人信息
     *
     * @注释加密 
     * @注释加密 
     */
    @RequestMapping("/info")
    public String info(Model model) {
        SysUser sysUser = sysUserService.getById(ShiroUtil.getSessionUid());
        model.addAttribute("sysUser", sysUser);
        return "/system/me/info";
    }

    /**
     * 修改密码页面
     *
     * @注释加密 
     * @注释加密 
     */
    @RequestMapping("/pwd")
    public String pwd(Model model) {
        return "/system/me/pwd";
    }

    /**
     * 修改密码
     */
    @RequestMapping("/doChangePwd")
    public String doChangePwd(String password, String newpassword, String newpassword2, Model model, RedirectAttributes redirectAttributes) {
        if (StringUtils.isBlank(password) || StringUtils.isBlank(newpassword) || StringUtils.isBlank(newpassword2)) {
            redirectAttributes.addFlashAttribute("msg", "客户端提交数据不能为空.");
            return redirectTo("/system/me/pwd");
        }
        Subject subject = SecurityUtils.getSubject();
        SysUser sysUser = (SysUser) subject.getPrincipal();
        SysUser user = sysUserService.getById(sysUser.getId());
        if (!user.getPassword().equals(ShiroUtil.md51024Pwd(password, user.getUserName()))) {
            redirectAttributes.addFlashAttribute("msg", "旧密码输入错误.");
            return redirectTo("/system/me/pwd");
        }
        if (!newpassword2.equals(newpassword)) {
            redirectAttributes.addFlashAttribute("msg", "两次输入的密码不一致.");
            return redirectTo("/system/me/pwd");
        }
        user.setPassword(ShiroUtil.md51024Pwd(newpassword, user.getUserName()));
        sysUserService.updateById(user);
        redirectAttributes.addFlashAttribute("info", "密码修改成功.");
        return redirectTo("/system/me/pwd");
    }

    /**
     * 更新用户
     *
     * @注释加密 
     * @注释加密 
     * @注释加密 
     */
    @RequestMapping("/updateUser")
    public String updateUser(SysUser sysUser, Model model, RedirectAttributes redirectAttributes) {
        SysUser user = sysUserService.getById(sysUser.getId());
        if (StringUtils.isNotBlank(user.getUserImg())) {
            user.setUserImg(sysUser.getUserImg());
        }
        sysUserService.updateById(user);
        model.addAttribute("sysUser", user);
        redirectAttributes.addFlashAttribute("info", "更新成功.");
        return redirectTo("/system/me/info");
    }

}
