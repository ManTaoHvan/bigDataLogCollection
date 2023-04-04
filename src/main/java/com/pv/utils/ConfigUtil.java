package com.pv.utils;

public class ConfigUtil {
	private static PropertiesLoaderUtil loader = new PropertiesLoaderUtil("config.properties");
	
	public static String getConfig(String key) {
		String value = loader.getProperty(key);
		return value;
	}
	
	
}
