package com.bilby.wa.pojo;

/**
 * table name:  alternative_name
 * author name: joseph
 * create time: 2019/09/11 10:44:48
 */
public class AlternativeName {

    private Integer anid;
    private Integer eid;
    private String aname;
    private Integer atype;
    private Integer astatus;

    public Integer getAnid() {
        return anid;
    }

    public void setAnid(Integer anid) {
        this.anid = anid;
    }

    public Integer getEid() {
        return eid;
    }

    public void setEid(Integer eid) {
        this.eid = eid;
    }

    public String getAname() {
        return aname;
    }

    public void setAname(String aname) {
        this.aname = aname;
    }

    public Integer getAtype() {
        return atype;
    }

    public void setAtype(Integer atype) {
        this.atype = atype;
    }

    public Integer getAstatus() {
        return astatus;
    }

    public void setAstatus(Integer astatus) {
        this.astatus = astatus;
    }
}

