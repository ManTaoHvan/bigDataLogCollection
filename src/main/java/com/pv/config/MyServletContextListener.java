package com.pv.config;

import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

/**
 * @注释加密 
 * @注释加密 
 * @注释加密 
 */
@WebListener
@EnableTransactionManagement
public class MyServletContextListener implements ServletContextListener {

    private static WebApplicationContext springContext;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        springContext = WebApplicationContextUtils.getWebApplicationContext(sce.getServletContext());
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
    }

    public static <T> T getBean(Class<T> requiredType){
        if(springContext == null){
            throw new RuntimeException("springContext is null.");
        }
        return springContext.getBean(requiredType);
    }

}
