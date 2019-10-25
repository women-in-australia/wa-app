package com.bilby.wa.pojo;

import com.google.gson.Gson;

import java.io.Serializable;

public class PageResponseInfo implements Serializable {
    public static final Integer CODE_SUCCESS_VALUE = 200;
    public static final Integer CODE_ERROR_VALUE = 1000;
    public static final String MSG_SUCCESS_VALUE = "success";
    public static final String MSG_ERROR_VALUE = "known error";

    private Integer code;
    private String msg;
    private Object data;
    private Integer page;
    private Integer allPageNum;
    private boolean hasNext;
    private boolean hasPrevious;

    private boolean receive;

    public static PageResponseInfo buildSuccess(Integer page, Integer allPageNum, boolean hasNext, boolean hasPrevious, Object data) {
        return build(page, allPageNum, hasNext, hasPrevious, CODE_SUCCESS_VALUE, MSG_SUCCESS_VALUE, data);
    }

    private static PageResponseInfo build(Integer page, Integer allPageNum, boolean hasNext, boolean hasPrevious, Integer code, String msg, Object data) {
        PageResponseInfo responseInfo = new PageResponseInfo();
        responseInfo.setCode(code);
        responseInfo.setMsg(msg);
        responseInfo.setPage(page);
        responseInfo.setAllPageNum(allPageNum);
        responseInfo.setHasNext(hasNext);
        responseInfo.setHasPrevious(hasPrevious);
        if (data != null) {
            responseInfo.data = data;
        }
        return responseInfo;
    }

    public boolean isHasPrevious() {
        return hasPrevious;
    }

    public void setHasPrevious(boolean hasPrevious) {
        this.hasPrevious = hasPrevious;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public PageResponseInfo setData(Object data) {
        this.data = data;
        return this;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getAllPageNum() {
        return allPageNum;
    }

    public void setAllPageNum(Integer allPageNum) {
        this.allPageNum = allPageNum;
    }

    public boolean isHasNext() {
        return hasNext;
    }

    public void setHasNext(boolean hasNext) {
        this.hasNext = hasNext;
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }

    public boolean isReceive() {
        return receive;
    }

    public void setReceive(boolean receive) {
        this.receive = receive;
    }
}
