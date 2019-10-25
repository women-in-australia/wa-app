package com.bilby.wa.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * table name:  user
 * author name: joseph
 * create time: 2019-08-12 13:45:37
 */
public class User {

    private Integer uid;
    private String email;
    @JsonIgnore
    private String password;
    private String phone;
    private String name;
    private String address;
    private String motivation;
    private String experience;
    private byte enabled;
    private Role role;
    private String invited;
    private Boolean msg;

    public User(Integer uid) {
        this.uid = uid;
    }

    public User() {
    }

    public Boolean getMsg() {
        return msg;
    }

    public void setMsg(Boolean msg) {
        this.msg = msg;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getInvited() {
        return invited;
    }

    public void setInvited(String invited) {
        this.invited = invited;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMotivation() {
        return motivation;
    }

    public void setMotivation(String motivation) {
        this.motivation = motivation;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public byte getEnabled() {
        return enabled;
    }

    public void setEnabled(byte enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return "User{" +
                "uid=" + uid +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", motivation='" + motivation + '\'' +
                ", experience='" + experience + '\'' +
                ", enabled=" + enabled +
                ", role=" + role +
                ", invited='" + invited + '\'' +
                '}';
    }
}

