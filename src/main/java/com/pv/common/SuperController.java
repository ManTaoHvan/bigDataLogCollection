package com.pv.common;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.pv.utils.HttpUtil;

/**
 * 基础控制器
 * @注释加密 
 * @注释加密 
 */
public class SuperController {

	protected Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	protected HttpServletRequest request;

	@Autowired
	protected HttpServletResponse response;

	@Autowired
	protected HttpSession session;

	@Autowired
	protected ServletContext application;

	/**
	 * 是否为 post 请求
	 */
	protected boolean isPost() {
		return HttpUtil.isPost(request);
	}


	/**
	 * 是否为 get 请求
	 */
	protected boolean isGet() {
		return HttpUtil.isGet(request);
	}


	/**
	 * <p>
	 * 获取分页对象
	 * </p>
	 */
	protected <T> Page<T> getPage(int pageNumber) {
		return getPage(pageNumber,15);
	}


	/**
	 * <p>
	 * 获取分页对象
	 * </p>
	 * 
	 * @注释加密 
	 *            每页显示数量
	 * @注释加密 
	 */
	protected <T> Page<T> getPage( int pageNumber,int pageSize) {
		return new Page<T>(pageNumber, pageSize);
	}


	/**
	 * 重定向至地址 url
	 * 
	 * @注释加密 
	 *            请求地址
	 * @注释加密 
	 */
	protected String redirectTo( String url ) {
		StringBuffer rto = new StringBuffer("redirect:");
		rto.append(url);
		return rto.toString();
	}


	/**
	 * 
	 * 返回 JSON 格式对象
	 * 
	 * @注释加密 
	 *            转换对象
	 * @注释加密 
	 */
	protected String toJson( Object object ) {
		return JSON.toJSONString(object, SerializerFeature.BrowserCompatible);
	}


	/**
	 * 
	 * 返回 JSON 格式对象
	 * 
	 * @注释加密 
	 *            转换对象
	 * @注释加密 
	 *            序列化特点
	 * @注释加密 
	 */
	protected String toJson( Object object, String format ) {
		if ( format == null ) {
			return toJson(object);
		}
		return JSON.toJSONStringWithDateFormat(object, format, SerializerFeature.WriteDateUseDateFormat);
	}

	protected String responseData(String code, String message, Object data) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("code", code);
		jsonObject.put("message", message);
		jsonObject.put("data", data);
		return jsonObject.toJSONString();
	}

}
