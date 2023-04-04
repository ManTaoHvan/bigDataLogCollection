package com.pv.modular.system.shiro;

import com.pv.modular.system.entity.SysUser;
import com.pv.modular.system.service.ISysRoleMenuService;
import com.pv.modular.system.service.ISysUserRoleService;
import com.pv.modular.system.service.ISysUserService;
import com.pv.modular.system.shiro.utils.exception.user.UserBlockedException;
import com.pv.modular.system.shiro.utils.exception.user.UserNotExistsException;
import com.pv.modular.system.shiro.utils.exception.user.UserPasswordNotMatchException;
import com.pv.modular.system.shiro.utils.exception.user.UserPasswordRetryLimitExceedException;
import com.pv.modular.system.shiro.utils.service.LoginService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;

/**
 * system Realm
 *
 * @注释加密 
 */
public class MyShiroRealm extends AuthorizingRealm {

    /**
     * 用户服务
     */
    @Autowired
    private ISysUserService userService;
    /**
     * 用户角色服务
     */
    @Autowired
    private ISysUserRoleService sysUserRoleService;
    /**
     * 角色菜单服务
     */
    @Autowired
    private ISysRoleMenuService sysRoleMenuService;

    @Autowired
    private LoginService loginService;

    /**
     * 认证
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        // 注释加密 
        UsernamePasswordToken user = (UsernamePasswordToken) token;

        SysUser sysUser = null;
        try
        {
            sysUser = loginService.login(user.getUsername(), new String(user.getPassword()));
        }
        catch (UserNotExistsException e)
        {
            throw new UnknownAccountException(e.getMessage(), e);
        }
        catch (UserPasswordNotMatchException e)
        {
            throw new IncorrectCredentialsException(e.getMessage(), e);
        }
        catch (UserPasswordRetryLimitExceedException e)
        {
            throw new ExcessiveAttemptsException(e.getMessage(), e);
        }
        catch (UserBlockedException e)
        {
            throw new LockedAccountException(e.getMessage(), e);
        }
        catch (Exception e)
        {
            throw new AuthenticationException(e.getMessage(), e);
        }

        /*SysUser sysUser = userService.getOne(new QueryWrapper<SysUser>().eq("userName", user.getUsername()));
        if (sysUser == null) {
            throw new UnknownAccountException();
        }
        if (sysUser.getUserState() == SysUser._0) {
            throw new LockedAccountException();
        }*/
        // 注释加密 
        // 注释加密 
        // 注释加密 
        ByteSource byteSource = ByteSource.Util.bytes(user.getUsername());
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(sysUser, sysUser.getPassword(), byteSource, getName());
        return info;
    }

    /**
     * 授权
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        // 注释加密 
        SysUser sysUser = (SysUser) principals.getPrimaryPrincipal();
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        Set<String> roles = sysUserRoleService.findRolesByUid(sysUser.getId());
        Set<String> permissions = sysRoleMenuService.findMenusByUid(sysUser.getId());
        info.setRoles(roles);
        info.setStringPermissions(permissions);
        return info;
    }
}
