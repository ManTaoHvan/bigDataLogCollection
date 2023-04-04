package com.pv.modular.system.shiro.utils.exception.user;

/**
 * 角色锁定异常类
 * 
 * @注释加密 
 */
public class RoleBlockedException extends UserException
{
    private static final long serialVersionUID = 1L;

    public RoleBlockedException()
    {
        super("role.blocked", null);
    }

}
