package com.pv.common;

import com.google.gson.Gson;
import com.pv.config.MyServletContextListener;
import com.pv.modular.system.entity.SysLog;
import com.pv.modular.system.entity.SysUser;
import com.pv.modular.system.service.ISysLogService;
import com.pv.utils.ShiroUtil;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.util.Date;

/**
 * 正常业务日志记录
 *
 * @注释加密 
 */
@Aspect
@Component
public class LogAdvice {

    public static final Logger logger = LoggerFactory.getLogger(LogAdvice.class);

    @Pointcut("@annotation(com.pv.common.Log)")
    public void controllerAspect() {

    }

    /**
     * 当方法正常返回是执行
     *
     * @注释加密 
     */
    @AfterReturning("controllerAspect()")
    public void doBefore(JoinPoint joinPoint) {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        Method method = methodSignature.getMethod();
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        Log log = method.getAnnotation(Log.class);
        SysUser sysUser = ShiroUtil.getSessionUser();
        if (log != null) {
            SysLog sysLog = new SysLog();
            sysLog.setCreateTime(new Date());
            sysLog.setTitle(log.value());
            sysLog.setUserName((sysUser != null) ? sysUser.getUserName() : "system");
            sysLog.setUrl(request.getRequestURI().toString());
            sysLog.setParams(new Gson().toJson(request.getParameterMap()));
            MyServletContextListener.getBean(ISysLogService.class).save(sysLog);
            logger.debug("记录日志:" + sysLog.toString());
        }
    }
}
