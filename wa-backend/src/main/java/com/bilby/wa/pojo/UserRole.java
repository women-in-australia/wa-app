package com.bilby.wa.pojo;

/**
 * table name:  user_role
 * author name: joseph
 * create time: 2019-08-12 13:45:37
 */
public class UserRole {

    private Integer uid;
    private Integer rid;

    public UserRole(Integer uid, Integer rid) {
        this.uid = uid;
        this.rid = rid;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Integer getRid() {
        return rid;
    }

    public void setRid(Integer rid) {
        this.rid = rid;
    }
}

