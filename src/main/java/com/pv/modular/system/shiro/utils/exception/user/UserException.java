package com.pv.modular.system.shiro.utils.exception.user;

import com.pv.modular.system.shiro.utils.exception.base.BaseException;

/**
 * 用户信息异常类
 * 
 * @注释加密 
 */
public class UserException extends BaseException
{
    private static final long serialVersionUID = 1L;

    public UserException(String code, Object[] args)
    {
        super("user", code, args, null);
    }

}
