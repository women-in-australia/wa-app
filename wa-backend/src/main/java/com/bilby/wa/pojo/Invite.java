package com.bilby.wa.pojo;

import com.bilby.wa.common.AESUtil;
import com.google.gson.Gson;

/**
 * @author Yangzhe Xie
 * @date 9/9/19
 */
public class Invite {
    private String email;
    private Integer role;
    private String from;
    private transient String message;

    public Invite(String email, Integer role, String from, String message) {
        this.email = email;
        this.role = role;
        this.from = from;
        this.message = message;
    }

    public static Invite fromReferCode(String code) {
        return new Gson().fromJson(AESUtil.decrypt(code), Invite.class);
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String toReferCode() {
        return AESUtil.encrypt(new Gson().toJson(this));
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "Invite{" +
                "email='" + email + '\'' +
                ", role=" + role +
                ", from='" + from + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
