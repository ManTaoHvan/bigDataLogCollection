package com.pv.utils;

import com.pv.modular.system.entity.SysUser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.subject.Subject;

/**
 * @注释加密 
 * @注释加密 
 * @注释加密 
 */
public class ShiroUtil {

    /**
     * 密码加密
     *
     * @注释加密 
     * @注释加密 
     * @注释加密 
     */
    public static String md51024Pwd(String password, Object salt) {
        return new SimpleHash("MD5", password, salt, 1024).toString();
    }

    /**
     * 获取当前Session中的用户
     *
     * @注释加密 
     */
    public static SysUser getSessionUser() {
        Subject subject = SecurityUtils.getSubject();
        if (subject != null) {
            Object object = subject.getPrincipal();
            if (object != null) {
                SysUser sysUser = (SysUser) object;
                return sysUser;
            }
        }
        return null;
    }

    /**
     * 获取当前用户ID
     *
     * @注释加密 
     */
    public static String getSessionUid() {
        SysUser sysUser = getSessionUser();
        if (sysUser != null) {
            return sysUser.getId();
        }
        return null;
    }

}
