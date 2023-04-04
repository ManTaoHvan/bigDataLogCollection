package com.pv.modular.system.shiro.utils.exception.user;

/**
 * 用户不存在异常类
 * 
 * @注释加密 
 */
public class UserNotExistsException extends UserException
{
    private static final long serialVersionUID = 1L;

    public UserNotExistsException()
    {
        super("user.not.exists", null);
    }
}
