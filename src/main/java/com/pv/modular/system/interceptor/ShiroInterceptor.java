package com.pv.modular.system.interceptor;

import com.pv.config.MyServletContextListener;
import com.pv.modular.system.service.ISysMenuService;
import com.pv.modular.system.service.ISysSettingService;
import com.pv.modular.system.entity.SysSetting;
import com.pv.modular.system.entity.SysUser;
import com.pv.modular.system.entity.TreeMenu;
import com.pv.utils.ShiroUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * @注释加密 
 * @注释加密 
 * @注释加密 
 */
@Component
public class ShiroInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {
        // 注释加密 
        if (handler instanceof HandlerMethod) {
            /**
             * 加载全局非登录访问常量
             */
            List<SysSetting> list = MyServletContextListener.getBean(ISysSettingService.class).findAll();
            for (SysSetting setting : list) {
                request.setAttribute(setting.getSysKey(), setting.getSysValue());
            }
            /**
             * 保存登录信息
             */
            SysUser me = ShiroUtil.getSessionUser();
            if (me == null) {
                return true;
            }
            me.setPassword("");
            request.setAttribute("me", me);
            /**
             * 资源和当前选中菜单
             */
            String res = request.getParameter("p");
            if (StringUtils.isNotBlank(res)) {
                request.getSession().setAttribute("res", res);
            }
            String cur = request.getParameter("t");
            if (StringUtils.isNotBlank(cur)) {
                request.getSession().setAttribute("cur", cur);
            }
            /**
             * 获取当前用户的菜单
             */
            List<TreeMenu> treeMenus = MyServletContextListener.getBean(ISysMenuService.class).selectTreeMenuByUserId(me.getId());
            request.setAttribute("treeMenus", treeMenus);
        }
        /**
         * 通过拦截
         */
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {

    }

}
