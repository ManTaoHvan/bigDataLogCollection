package com.pv.modular.system.controller;

import com.alibaba.fastjson.JSONObject;
import com.google.code.kaptcha.servlet.KaptchaExtend;
import com.google.common.collect.Maps;
import com.pv.modular.system.entity.SysUser;
import com.pv.modular.system.service.ISysLogService;
import com.pv.common.SuperController;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributesModelMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 * 登录控制器
 *
 * @注释加密 
 * @注释加密 
 */
@Controller
@RequestMapping("/login")
public class LoginController extends SuperController {
    /**
     * 日志服务
     */
    @Autowired
    private ISysLogService sysLogService;

    /**
     * 登录页面
     */
    @RequestMapping
    public String login(Model model) {
        return "login";
    }


    @ResponseBody
    @PostMapping(value = "/doWeiXinLogin")
    public String doWeiXinLogin(@RequestBody JSONObject jsonParam, RedirectAttributesModelMap model) {
        JSONObject jsonObject = new JSONObject();
        Subject currentUser = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(jsonParam.getString("username"), jsonParam.getString("password"));
        if (!currentUser.isAuthenticated()) {
            try {
                currentUser.login(token);
            } catch (UnknownAccountException uae) {
                jsonObject.put("code", "400");
                jsonObject.put("message", "用户名或密码错误");
                return jsonObject.toJSONString();
            } catch (IncorrectCredentialsException ice) {
                jsonObject.put("code", "400");
                jsonObject.put("message", "用户名或密码错误");
                return jsonObject.toJSONString();
            } catch (LockedAccountException lae) {
                jsonObject.put("code", "400");
                jsonObject.put("message", "账号已锁定");
                return jsonObject.toJSONString();
            } catch (ExcessiveAttemptsException eae) {
                jsonObject.put("code", "400");
                jsonObject.put("message", "账号已锁定，请5分钟后再试");
                return jsonObject.toJSONString();
            } catch (AuthenticationException ae) {
                jsonObject.put("code", "400");
                jsonObject.put("message", "服务器繁忙");
                return jsonObject.toJSONString();
            }
        }
        Subject subject = SecurityUtils.getSubject();
        SysUser sysUser = (SysUser) subject.getPrincipal();
        sysLogService.insertLog("微信用户登录成功", sysUser.getUserName(), request.getRequestURI(), "");
        String sessionId = request.getSession().getId();
        Map<String, Object> dto = Maps.newHashMap();
        dto.put("name", sysUser.getUserName());
        dto.put("loginPassword", sysUser.getPassword());
        dto.put("desc", sysUser.getUserDesc());
        dto.put("sessionId", sessionId);
        jsonObject.put("code", "200");
        jsonObject.put("message", "登录成功");
        jsonObject.put("data", dto);
        request.getSession().setAttribute("sysUser", sysUser);
        return jsonObject.toJSONString();
    }


    /**
     * 执行登录
     */
    @PostMapping(value = "/doLogin")
    public String doLogin(String userName, String password, String captcha, String return_url, RedirectAttributesModelMap model) {
        Subject currentUser = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(userName, password);
        if (!currentUser.isAuthenticated()) {
            // 注释加密 
            try {
                currentUser.login(token);
            } catch (UnknownAccountException uae) {
                model.addFlashAttribute("error", "用户名或密码错误");
                return redirectTo("/login");
            } catch (IncorrectCredentialsException ice) {
                model.addFlashAttribute("error", "用户名或密码错误");
                return redirectTo("/login");
            } catch (LockedAccountException lae) {
                model.addFlashAttribute("error", "账号已锁定");
                return redirectTo("/login");
            } catch (ExcessiveAttemptsException eae) {
                model.addFlashAttribute("error", "账号已锁定，请5分钟后再试");
                return redirectTo("/login");
            } catch (AuthenticationException ae) {
                // 注释加密 
                model.addFlashAttribute("error", "服务器繁忙");
                return redirectTo("/login");
            }
        }

        /**
         * 记录登录日志
         * */

        Subject subject = SecurityUtils.getSubject();
        SysUser sysUser = (SysUser) subject.getPrincipal();
        sysLogService.insertLog("用户登录成功", sysUser.getUserName(), request.getRequestURI(), "");

        return redirectTo("/");
    }

    /**
     * 验证码
     */
    @ResponseBody
    @PostMapping("/captcha")
    public void captcha(HttpServletResponse response) throws ServletException, IOException {
        KaptchaExtend kaptchaExtend = new KaptchaExtend();
        kaptchaExtend.captcha(request, response);
    }

}
