package com.pv.modular.collect.contorller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.pv.common.SuperController;
import com.pv.modular.collect.entity.CollecctOffLineBean;
import com.pv.modular.collect.entity.CollecctTotalBean;
import com.pv.modular.collect.service.ICollectOffLineService;
import com.pv.modular.collect.service.ICollectTotalService;
import com.pv.modular.collect.utils.downUtil;
import com.pv.modular.system.entity.SysUser;
import com.pv.modular.system.service.ISysDeptService;
import com.pv.utils.CommonUtil;
import com.pv.utils.ShiroUtil;
import com.pv.utils.StringUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * 部门控制器
 *
 * @注释加密 
 * @注释加密 
 */
@Controller
@RequestMapping("/offLine")
public class OffLineController extends SuperController {

    @Autowired
    private ICollectOffLineService offLineService;

    @Autowired
    private ICollectTotalService totalService;

    @Autowired
    private ISysDeptService sysDeptService;

    @RequestMapping("/list/{pageNumber}")
    public String list(@PathVariable Integer pageNumber, @RequestParam(defaultValue = "15") Integer pageSize,
                       String search,String ip, Model model) {
        Page<CollecctOffLineBean> page = getPage(pageNumber, pageSize);
        model.addAttribute("pageSize", pageSize);

        SysUser user = ShiroUtil.getSessionUser();
        if (StringUtils.isBlank(search)){
            if (!user.getUserName().equals("admin")){
                search=sysDeptService.getById(user.getDeptId()).getDeptName();
            }
        }

        QueryWrapper<CollecctOffLineBean> ew = new QueryWrapper<CollecctOffLineBean>();
        if (StringUtils.isNotBlank(search)){
            ew.like("departName",search);
        }
        ew.eq("updateTime",CommonUtil.getTodayDay());
        if (StringUtils.isNotBlank(ip)){
            ew.like("ips",ip);
            model.addAttribute("ip", ip);
        }

        IPage<CollecctOffLineBean> pageData = offLineService.page(page, ew);
        model.addAttribute("search", search);
        model.addAttribute("pageData", pageData);
        return "/offLine/list";
    }


    @RequestMapping("/detail/{pageNumber}")
    public String detail(@PathVariable Integer pageNumber, @RequestParam(defaultValue = "15") Integer pageSize,
                       String search,String ip, Model model) {
        Page<CollecctTotalBean> page = getPage(pageNumber, pageSize);
        model.addAttribute("pageSize", pageSize);

        SysUser user = ShiroUtil.getSessionUser();
        if (StringUtils.isBlank(search)){
            if (!user.getUserName().equals("admin")){
                search=sysDeptService.getById(user.getDeptId()).getDeptName();
            }
        }

        IPage<CollecctTotalBean> pageData = totalService.logList(page, search,ip,"");
        model.addAttribute("ip", ip);
        model.addAttribute("pageData", pageData);
        return "/offLine/detail";
    }



    @RequestMapping(value = "/down"  ,produces = {"application/vnd.ms-excel;charset=UTF-8"})
    public Object down(HttpServletRequest request, String search, String ip) throws IOException {
        String uploadpath = request.getSession().getServletContext().getRealPath(File.separator+"upload");
        File uploadfile = new File(uploadpath);
        if(!uploadfile.exists()) {
            uploadfile.mkdirs();
        }

        SysUser user = ShiroUtil.getSessionUser();
        if (StringUtils.isBlank(search)){
            if (!user.getUserName().equals("admin")){
                search=sysDeptService.getById(user.getDeptId()).getDeptName();
            }
        }

        QueryWrapper<CollecctOffLineBean> ew = new QueryWrapper<CollecctOffLineBean>();
        if (StringUtils.isNotBlank(search)){
            ew.like("departName",search);
        }
        ew.eq("updateTime",CommonUtil.getTodayDay());
        if (StringUtils.isNotBlank(ip)){
            ew.like("ips",ip+",");
        }

        List<CollecctOffLineBean> list = offLineService.list(ew);
        String filename = downUtil.downOffline(uploadpath,list);
        ResponseEntity<byte[]> entity = StringUtil.downloadFile(filename);
        return entity;
    }


}
