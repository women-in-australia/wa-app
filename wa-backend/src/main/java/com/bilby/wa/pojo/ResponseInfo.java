package com.bilby.wa.pojo;

import com.google.gson.Gson;

import java.io.Serializable;

public class ResponseInfo implements Serializable {
    public static final Integer CODE_SUCCESS_VALUE = 200;
    public static final Integer CODE_ERROR_VALUE = 1000;
    public static final String MSG_SUCCESS_VALUE = "success";
    public static final String MSG_ERROR_VALUE = "known error";

    private Integer code;
    private String msg;
    private Object data;

    public static ResponseInfo buildSuccess() {
        return buildSuccess(null);
    }

    public static ResponseInfo buildSuccess(Object data) {
        return build(CODE_SUCCESS_VALUE, MSG_SUCCESS_VALUE, data);
    }

    public static ResponseInfo buildFailure(Integer code, String msg) {
        return build(code, msg, null);
    }

    public static ResponseInfo buildFailure(String msg) {
        return build(CODE_ERROR_VALUE, msg, null);
    }

    public static ResponseInfo buildFailure() {
        return build(CODE_ERROR_VALUE, MSG_ERROR_VALUE, null);
    }

    private static ResponseInfo build(Integer code, String msg, Object data) {
        ResponseInfo responseInfo = new ResponseInfo();
        responseInfo.setCode(code);
        responseInfo.setMsg(msg);
        if (data != null) {
            responseInfo.data = data;
        }
        return responseInfo;
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

    public ResponseInfo setData(Object data) {
        this.data = data;
        return this;
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}
