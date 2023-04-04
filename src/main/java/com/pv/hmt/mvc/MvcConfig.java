package com.pv.hmt.mvc;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // 注释加密  // 注释加密  // 注释加密  // 注释加密 
        registry.addViewController ("/webui/myEcharts.html").setViewName ("/webui/myEcharts"); // 注释加密  // 注释加密 
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 注释加密 
        registry.addResourceHandler ("/**")
                .addResourceLocations ("classpath:/static/");
    }
}

