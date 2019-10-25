package com.bilby.wa.pojo;

/**
 * table name:  published_resources
 * author name: joseph
 * create time: 2019/09/14 15:30:00
 */
public class PublishedResources {

    private Integer prid;
    private Integer eid;
    private String prTitle;
    private String prPublisher;
    private String prUrl;
    private String prDate;
    private String prNote;
    private Integer prStatus;

    public Integer getPrid() {
        return prid;
    }

    public void setPrid(Integer prid) {
        this.prid = prid;
    }

    public Integer getEid() {
        return eid;
    }

    public void setEid(Integer eid) {
        this.eid = eid;
    }

    public String getPrTitle() {
        return prTitle;
    }

    public void setPrTitle(String prTitle) {
        this.prTitle = prTitle;
    }

    public String getPrPublisher() {
        return prPublisher;
    }

    public void setPrPublisher(String prPublisher) {
        this.prPublisher = prPublisher;
    }

    public String getPrUrl() {
        return prUrl;
    }

    public void setPrUrl(String prUrl) {
        this.prUrl = prUrl;
    }

    public String getPrDate() {
        return prDate;
    }

    public void setPrDate(String prDate) {
        this.prDate = prDate;
    }

    public String getPrNote() {
        return prNote;
    }

    public void setPrNote(String prNote) {
        this.prNote = prNote;
    }

    public Integer getPrStatus() {
        return prStatus;
    }

    public void setPrStatus(Integer prStatus) {
        this.prStatus = prStatus;
    }
}

