package com.bilby.wa.pojo;

public class ResponseUser {
    private Integer uid;
    private String username;
    private String role;
    private String name;

    public ResponseUser() {
    }

    public ResponseUser(Integer uid, String username, String role, String name) {
        this.uid = uid;
        this.username = username;
        this.role = role;
        this.name = name;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
