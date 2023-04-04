package com.pv.config;

import com.pv.modular.system.interceptor.ShiroInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @注释加密 
 * @注释加密 
 * @注释加密 
 */
@Configuration
public class AdaptConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new ShiroInterceptor()).addPathPatterns("/**");
    }

}
