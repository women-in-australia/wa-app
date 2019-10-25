package com.bilby.wa.pojo;

/**
 * @author Yangzhe Xie
 * @date 14/9/19
 */
public class EntityOccupationPrompt {
    Integer oid;
    String oname;

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

    @Override
    public String toString() {
        return "EntityOccupationPrompt{" +
                "oid=" + oid +
                ", oname='" + oname + '\'' +
                '}';
    }
}
