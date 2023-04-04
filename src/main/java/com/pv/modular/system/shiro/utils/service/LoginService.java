package com.pv.modular.system.shiro.utils.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pv.modular.system.entity.SysUser;
import com.pv.modular.system.service.ISysUserService;
import com.pv.modular.system.shiro.utils.exception.user.UserBlockedException;
import com.pv.modular.system.shiro.utils.exception.user.UserNotExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 登录校验方法
 * 
 * @注释加密 
 */
@Component
public class LoginService
{
    @Autowired
    private PasswordService passwordService;

    @Autowired
    private ISysUserService userService;

    /**
     * 登录
     */
    public SysUser login(String username, String password)
    {
        SysUser sysUser = userService.getOne(new QueryWrapper<SysUser>().eq("userName", username));
        if (sysUser == null) {
            throw new UserNotExistsException();
        }
        if (sysUser.getUserState() == SysUser._0) {
            throw new UserBlockedException();
        }
        passwordService.validate(sysUser, password);

        return sysUser;
    }

}
