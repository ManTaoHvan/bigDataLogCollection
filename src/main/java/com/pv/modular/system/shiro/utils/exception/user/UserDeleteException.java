package com.pv.modular.system.shiro.utils.exception.user;

/**
 * 用户账号已被删除
 * 
 * @注释加密 
 */
public class UserDeleteException extends UserException
{
    private static final long serialVersionUID = 1L;

    public UserDeleteException()
    {
        super("user.password.delete", null);
    }
}
