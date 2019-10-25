package com.bilby.wa.pojo;

/**
 * table name:  occupation
 * author name: joseph
 * create time: 2019/09/11 10:44:48
 */
public class Occupation {

    private Integer eoid;
    private Integer oid;
    private String oname;
    private Integer ostatus;

    public Occupation() {
    }

    public Integer getEoid() {
        return eoid;
    }

    public void setEoid(Integer eoid) {
        this.eoid = eoid;
    }

    public Occupation(Integer oid, String oname) {
        this.oid = oid;
        this.oname = oname;
    }

    public Integer getOstatus() {
        return ostatus;
    }

    public void setOstatus(Integer ostatus) {
        this.ostatus = ostatus;
    }

    public Integer getOid() {
        return oid;
    }

    public void setOid(Integer oid) {
        this.oid = oid;
    }

    public String getOname() {
        return oname;
    }

    public void setOname(String oname) {
        this.oname = oname;
    }
}

