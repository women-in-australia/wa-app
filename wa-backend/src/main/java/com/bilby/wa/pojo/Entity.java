package com.bilby.wa.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * table name:  entity
 * author name: joseph
 * create time: 2019/09/11 10:44:48
 */
public class Entity {

    private Integer eid;
    private String existEid;
    private Integer type;
    private String name;
    private String subname;
    private String startDate;
    private String endDate;
    private String birthPlace;
    private String birthState;
    private String birthCountry;
    private String deathPlace;
    private String deathState;
    private String deathCountry;
    private String summary;
    private String detail;
    private String notes;
    private boolean isDraft;
    private Integer status;
    private String photo;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") //set
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+11") //get
    private Date createTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") //set
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+11") //get
    private Date lastEditTime;

    public Integer getEid() {
        return eid;
    }

    public void setEid(Integer eid) {
        this.eid = eid;
    }

    public String getExistEid() {
        return existEid;
    }

    public void setExistEid(String existEid) {
        this.existEid = existEid;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubname() {
        return subname;
    }

    public void setSubname(String subname) {
        this.subname = subname;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public boolean isDraft() {
        return isDraft;
    }

    public void setDraft(boolean draft) {
        isDraft = draft;
    }

    public String getBirthPlace() {
        return birthPlace;
    }

    public void setBirthPlace(String birthPlace) {
        this.birthPlace = birthPlace;
    }

    public String getBirthState() {
        return birthState;
    }

    public void setBirthState(String birthState) {
        this.birthState = birthState;
    }

    public String getBirthCountry() {
        return birthCountry;
    }

    public void setBirthCountry(String birthCountry) {
        this.birthCountry = birthCountry;
    }

    public String getDeathPlace() {
        return deathPlace;
    }

    public void setDeathPlace(String deathPlace) {
        this.deathPlace = deathPlace;
    }

    public String getDeathState() {
        return deathState;
    }

    public void setDeathState(String deathState) {
        this.deathState = deathState;
    }

    public String getDeathCountry() {
        return deathCountry;
    }

    public void setDeathCountry(String deathCountry) {
        this.deathCountry = deathCountry;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public boolean getIsDraft() {
        return isDraft;
    }

    public void setIsDraft(boolean isDraft) {
        this.isDraft = isDraft;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getLastEditTime() {
        return lastEditTime;
    }

    public void setLastEditTime(Date lastEditTime) {
        this.lastEditTime = lastEditTime;
    }
}

