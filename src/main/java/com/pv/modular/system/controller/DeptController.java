package com.pv.modular.system.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.pv.modular.system.entity.SysDept;
import com.pv.modular.system.service.ISysDeptService;
import com.pv.common.Rest;
import com.pv.common.SuperController;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 部门控制器
 *
 * @注释加密 
 * @注释加密 
 */
@Controller
@RequestMapping("/system/dept")
public class DeptController extends SuperController {

    @Autowired
    private ISysDeptService sysDeptService;

    /**
     * 分页查询部门
     */
    @RequiresPermissions("listDept")
    @RequestMapping("/list/{pageNumber}")
    public String list(@PathVariable Integer pageNumber, @RequestParam(defaultValue = "15") Integer pageSize, String search, Model model) {
        Page<SysDept> page = getPage(pageNumber, pageSize);
        model.addAttribute("pageSize", pageSize);
        // 注释加密 
        QueryWrapper<SysDept> ew = new QueryWrapper<SysDept>();
        if (StringUtils.isNotBlank(search)) {
            ew.like("deptName", search);
            model.addAttribute("search", search);
        }
        IPage<SysDept> pageData = sysDeptService.page(page, ew);
        model.addAttribute("pageData", pageData);
        return "/system/dept/list";
    }

    /**
     * 新增部门
     */
    @RequiresPermissions("addDept")
    @RequestMapping("/add")
    public String add(Model model) {
        return "/system/dept/add";
    }

    /**
     * 执行新增
     */
    @RequiresPermissions("addDept")
    @RequestMapping("/doAdd")
    @ResponseBody
    public Rest doAdd(SysDept dept, String[] roleId) {
        sysDeptService.save(dept);
        return Rest.ok();
    }

    /**
     * 删除部门
     */
    @RequiresPermissions("deleteDept")
    @RequestMapping("/delete")
    @ResponseBody
    public Rest delete(String id) {
        sysDeptService.removeById(id);
        return Rest.ok();
    }

    /**
     * 编辑部门
     */
    @RequiresPermissions("editDept")
    @RequestMapping("/edit/{id}")
    public String edit(@PathVariable String id, Model model) {
        SysDept dept = sysDeptService.getById(id);
        model.addAttribute("dept", dept);
        return "/system/dept/edit";
    }

    /**
     * 执行编辑
     */
    @RequiresPermissions("editDept")
    @RequestMapping("/doEdit")
    @ResponseBody
    public Rest doEdit(SysDept dept, Model model) {
        sysDeptService.updateById(dept);
        return Rest.ok();
    }

}
