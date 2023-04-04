package com.pv;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pv.config.MyServletContextListener;
import com.pv.modular.collect.entity.CollecctOffLineBean;
import com.pv.modular.collect.entity.CollecctRecordBean;
import com.pv.modular.collect.entity.CollecctSocBean;
import com.pv.modular.collect.entity.CollecctTotalBean;
import com.pv.modular.collect.service.ICollectOffLineService;
import com.pv.modular.collect.service.ICollectRecordService;
import com.pv.modular.collect.service.ICollectSocService;
import com.pv.modular.collect.service.ICollectTotalService;
import com.pv.modular.system.entity.SysMenu;
import com.pv.modular.system.entity.SysRole;
import com.pv.modular.system.entity.SysUser;
import com.pv.modular.system.service.ISysMenuService;
import com.pv.modular.system.service.ISysRoleMenuService;
import com.pv.modular.system.service.ISysRoleService;
import com.pv.modular.system.service.ISysUserService;
import com.pv.utils.CommonUtil;
import com.pv.utils.ExcelUtil;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = PowerApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TestAdmin {
	
	@Autowired
    private ISysRoleService sysRoleService;
	@Autowired
    private ISysRoleMenuService sysRoleMenuService;
	@Autowired
    private ISysMenuService sysMenuService;
	@Autowired
    private ISysUserService sysUserService;
    @Autowired
	private ICollectSocService socService;


	@Autowired
	private ICollectRecordService recordService;
	/**
	 * 创建一个Admin用户ddddddd
	 */
	@Test
	public void addAdmin() {
		
	 // 注释加密 
		SysRole sysRole = new SysRole();
		sysRole.setRoleName("超级管理员1");
		sysRole.setRoleState(1);
		sysRole.setCreateTime(new Date());
		sysRoleService.save(sysRole);
	 // 注释加密 
		List<Object> list = sysMenuService.listObjs(new QueryWrapper<SysMenu>().select("id"));
		System.out.println(list.size());
	 // 注释加密 
		sysRoleMenuService.addAuth(sysRole.getId(),list.toArray(new String[list.size()]));
	 // 注释加密 
		SysUser user = new SysUser();
		user.setUserState(1);
		user.setUserName("admin");
		user.setPassword("123456");
		user.setCreateTime(new Date());
		sysUserService.insertUser(user, new String[]{sysRole.getId()});
		
	}
	
	/**
	 * 修改Admin的密码位123456
	 */
	@Test
	public void changeAdminPwd() {
	 // 注释加密 
		String pwd = new SimpleHash("MD5", "123456", "admin", 1024).toString();
		System.out.println(pwd);
	}


	@Test
	public void test8(){
		List<CollecctTotalBean> totalBeans = MyServletContextListener.getBean(ICollectTotalService.class)
				.logList("","", CommonUtil.getTodayDay());
		MyServletContextListener.getBean(ICollectTotalService.class).remove(null);

		MyServletContextListener.getBean(ICollectTotalService.class).saveBatch(totalBeans);
	}

	@Test
	public void test10(){
		List<CollecctTotalBean> totalBeans = MyServletContextListener.getBean(ICollectTotalService.class)
				.logList("","", CommonUtil.getTodayDay());
		for (CollecctTotalBean bean:totalBeans){
			List<CollecctOffLineBean> offLineBeans = MyServletContextListener.getBean(ICollectOffLineService.class)
					.list(new QueryWrapper<CollecctOffLineBean>().eq("socip",bean.getFip()));
            if (offLineBeans!=null && offLineBeans.size()>0){
                MyServletContextListener.getBean(ICollectOffLineService.class)
                        .remove(new QueryWrapper<CollecctOffLineBean>().eq("socip",bean.getFip()));
            }
		}
	}



	@Test
	public void test_1(){
		String path="D://工作簿1.xlsx";
		File file = new File(path);
		Map<String, ArrayList<ArrayList<Object>>>map =  ExcelUtil.readExcel(file);
	 // 注释加密 
		for (Map.Entry<String,ArrayList<ArrayList<Object>>> entry:map.entrySet()){ // 注释加密 
			for(ArrayList<Object> arrayLists:entry.getValue()){
			 // 注释加密 
				/*WeiChatBean bean = new WeiChatBean();
				bean.setId((String)arrayLists.get(0));*/
				SysUser user = new SysUser();
				user.setPassword("1qaz!QAZ");
				user.setUserName((String)arrayLists.get(2));
				user.setUserState(1);
				user.setUserDesc((String)arrayLists.get(6));
				user.setDeptId((String)arrayLists.get(7));
				String[] roleId = {"9ad16ddb7e8f49b29b4c808fc082f883"};
				sysUserService.insertUser(user,roleId);
			}
		}
	}

	@Test
	public void test_2(){
		String path="D://soc_20211206.xlsx";
		File file = new File(path);
		Map<String, ArrayList<ArrayList<Object>>>map =  ExcelUtil.readExcel(file);
		for (Map.Entry<String,ArrayList<ArrayList<Object>>> entry:map.entrySet()){ // 注释加密 
			for(ArrayList<Object> arrayLists:entry.getValue()){
			 // 注释加密 
				/*WeiChatBean bean = new WeiChatBean();
				bean.setId((String)arrayLists.get(0));*/
				CollecctSocBean bean = new CollecctSocBean();
				bean.setIps((String)arrayLists.get(1));
				bean.setSysType((String)arrayLists.get(2));
				bean.setProName((String)arrayLists.get(3));
				bean.setDepartName((String)arrayLists.get(4));
				bean.setSocip((String)arrayLists.get(5));
				socService.save(bean);
			}
		}
	}

	@Test
	public void test_22(){
		String path="E://邮电//桌面//日志采集//胡小兵//送过来的系统日志及已采集过的机器//已采集过的机器.xls";
		File file = new File(path);
		Map<String, ArrayList<ArrayList<Object>>>map =  ExcelUtil.readExcel(file);
		for (Map.Entry<String,ArrayList<ArrayList<Object>>> entry:map.entrySet()){ // 注释加密 
			for(ArrayList<Object> arrayLists:entry.getValue()){
			 // 注释加密 
				/*WeiChatBean bean = new WeiChatBean();
				bean.setId((String)arrayLists.get(0));*/
				CollecctRecordBean bean = new CollecctRecordBean();

				bean.setSocip((String)arrayLists.get(0));
				bean.setIps((String)arrayLists.get(1));
				bean.setSysType((String)arrayLists.get(2));
				bean.setProName((String)arrayLists.get(3));
				bean.setDepartName((String)arrayLists.get(4));
				bean.setCip((String)arrayLists.get(6));
				bean.setCreateTime("20211116");
				recordService.save(bean);
			}
		}
	}

}
