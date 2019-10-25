package com.bilby.wa.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * table name:  user_review
 * author name: joseph
 * create time: 2019/09/11 10:44:48
 */
public class UserReview {

    private Integer urid;
    private User reviewer;
    private Integer eid;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+11")
    private Date reviewTime;
    private String feedback;
    private Integer statusName;
    private Integer statusOccupation;
    private Integer statusStart;
    private Integer statusEnd;
    private Integer statusSummary;
    private Integer statusDetail;
    private Integer statusNotes;

    public Integer getEid() {
        return eid;
    }

    public void setEid(Integer eid) {
        this.eid = eid;
    }

    public Integer getUrid() {
        return urid;
    }

    public void setUrid(Integer urid) {
        this.urid = urid;
    }

    public User getReviewer() {
        return reviewer;
    }

    public void setReviewer(User reviewer) {
        this.reviewer = reviewer;
    }

    public Date getReviewTime() {
        return reviewTime;
    }

    public void setReviewTime(Date reviewTime) {
        this.reviewTime = reviewTime;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public Integer getStatusName() {
        return statusName;
    }

    public void setStatusName(Integer statusName) {
        this.statusName = statusName;
    }

    public Integer getStatusOccupation() {
        return statusOccupation;
    }

    public void setStatusOccupation(Integer statusOccupation) {
        this.statusOccupation = statusOccupation;
    }

    public Integer getStatusStart() {
        return statusStart;
    }

    public void setStatusStart(Integer statusStart) {
        this.statusStart = statusStart;
    }

    public Integer getStatusEnd() {
        return statusEnd;
    }

    public void setStatusEnd(Integer statusEnd) {
        this.statusEnd = statusEnd;
    }

    public Integer getStatusSummary() {
        return statusSummary;
    }

    public void setStatusSummary(Integer statusSummary) {
        this.statusSummary = statusSummary;
    }

    public Integer getStatusDetail() {
        return statusDetail;
    }

    public void setStatusDetail(Integer statusDetail) {
        this.statusDetail = statusDetail;
    }

    public Integer getStatusNotes() {
        return statusNotes;
    }

    public void setStatusNotes(Integer statusNotes) {
        this.statusNotes = statusNotes;
    }
}

