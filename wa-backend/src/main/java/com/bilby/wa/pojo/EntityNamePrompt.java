package com.bilby.wa.pojo;

/**
 * @author Yangzhe Xie
 * @date 14/9/19
 */
public class EntityNamePrompt {
    Integer eid;
    String name;

    public Integer getEid() {
        return eid;
    }

    public void setEid(Integer eid) {
        this.eid = eid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "EntityNamePrompt{" +
                "eid=" + eid +
                ", name='" + name + '\'' +
                '}';
    }
}
