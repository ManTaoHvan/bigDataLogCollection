package com.pv.modular.system.shiro.utils.exception.user;

/**
 * 验证码错误异常类
 * 
 * @注释加密 
 */
public class CaptchaException extends UserException
{
    private static final long serialVersionUID = 1L;

    public CaptchaException()
    {
        super("user.jcaptcha.error", null);
    }
}
