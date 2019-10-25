package com.bilby.wa.pojo;

/**
 * table name:  related_entity
 * author name: joseph
 * create time: 2019/09/11 10:59:03
 */
public class RelatedEntity {

    private Integer roid;
    private Integer eid;
    private Integer relatedEid;
    private String relatedEname;
    private Integer relatedEtype;
    private Integer relationship;
    private Integer statusRe;

    public Integer getRelatedEtype() {
        return relatedEtype;
    }

    public void setRelatedEtype(Integer relatedEtype) {
        this.relatedEtype = relatedEtype;
    }

    public String getRelatedEname() {
        return relatedEname;
    }

    public void setRelatedEname(String relatedEname) {
        this.relatedEname = relatedEname;
    }

    public Integer getRoid() {
        return roid;
    }

    public void setRoid(Integer roid) {
        this.roid = roid;
    }

    public Integer getEid() {
        return eid;
    }

    public void setEid(Integer eid) {
        this.eid = eid;
    }

    public Integer getRelatedEid() {
        return relatedEid;
    }

    public void setRelatedEid(Integer relatedEid) {
        this.relatedEid = relatedEid;
    }

    public Integer getRelationship() {
        return relationship;
    }

    public void setRelationship(Integer relationship) {
        this.relationship = relationship;
    }

    public Integer getStatusRe() {
        return statusRe;
    }

    public void setStatusRe(Integer statusRe) {
        this.statusRe = statusRe;
    }
}

