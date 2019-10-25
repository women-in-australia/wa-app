package com.bilby.wa.pojo;

import java.util.Date;

public class SysLog {
    private String url;
    private Date time;
    private String method;
    private String params;
    private String remoteAddress;

    public String getRemoteAddress() {
        return remoteAddress;
    }

    public void setRemoteAddress(String remoteAddress) {
        this.remoteAddress = remoteAddress;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getParams() {
        return params;
    }

    public void setParams(String params) {
        this.params = params;
    }

    @Override
    public String toString() {
        return "\n----------------Begin request--------------------------\n" +
                "URI: " + url + "\n" +
                "Time: " + time + "\n" +
                "Params: " + params + "\n" +
                "Method: " + method + "\n" +
                "Remote address: " + remoteAddress + "\n" +
                "----------------End request--------------------------\n";
//        return "SysLog{" +
//                "url='" + url + '\'' +
//                ", time=" + time +
//                ", method='" + method + '\'' +
//                ", params='" + params + '\'' +
//                '}';
    }
}
