package com.pv.common;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 *
 */
@Retention(RetentionPolicy.RUNTIME)  // 注释加密 
@Target(ElementType.METHOD) // 注释加密 
public @interface Log {
    String value();
}
