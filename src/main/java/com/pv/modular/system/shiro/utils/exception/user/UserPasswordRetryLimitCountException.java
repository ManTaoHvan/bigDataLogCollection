package com.pv.modular.system.shiro.utils.exception.user;

/**
 * 用户错误记数异常类
 * 
 * @注释加密 
 */
public class UserPasswordRetryLimitCountException extends UserException
{
    private static final long serialVersionUID = 1L;

    public UserPasswordRetryLimitCountException(int retryLimitCount)
    {
        super("user.password.retry.limit.count", new Object[] { retryLimitCount });
    }
}
