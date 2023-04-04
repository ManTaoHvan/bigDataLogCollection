package com.pv.common;

/**
 * @注释加密 
 * @注释加密 
 * @注释加密 
 */
public class Rest {

    private long code = 0;

    private long count = 0;

    private Object data;

    private String msg;

    public Rest() {
        super();
        // 注释加密 
    }

    public Rest(long code, long count, Object data, String msg) {
        super();
        this.code = code;
        this.count = count;
        this.data = data;
        this.msg = msg;
    }

    public static Rest ok() {
        return new Rest(200, 0, null, "");
    }

    public static Rest ok(String msg) {
        return new Rest(200, 0, null, msg);
    }

    public static Rest okData(Object data) {
        return new Rest(200, 0, data, "ok");
    }

    public static Rest failure(String msg) {
        // 注释加密 
        return new Rest(500, 0, null, msg);
    }

    public long getCode() {
        return code;
    }

    public void setCode(long code) {
        this.code = code;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
