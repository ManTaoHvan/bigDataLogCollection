package com.pv.modular.system.shiro.utils.exception.user;

/**
 * 用户锁定异常类
 * 
 * @注释加密 
 */
public class UserBlockedException extends UserException
{
    private static final long serialVersionUID = 1L;

    public UserBlockedException()
    {
        super("user.blocked", null);
    }
}
