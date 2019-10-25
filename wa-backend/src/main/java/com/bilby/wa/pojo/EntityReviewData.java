package com.bilby.wa.pojo;

import com.bilby.wa.common.StringUtil;

import java.util.List;

public class EntityReviewData {
    private Integer eid;
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
    private String photo;
    private Integer status;

    private String feedback;
    private Integer statusName;
    private Integer statusOccupation;
    private Integer statusStart;
    private Integer statusEnd;
    private Integer statusSummary;
    private Integer statusDetail;
    private Integer statusNotes;

    private List<Occupation> occupations;
    private List<RelatedEntity> relatedPeople;
    private List<RelatedEntity> relatedOrganizations;
    private List<DigitalResources> digitalResources;
    private List<PublishedResources> publishedResources;
    private List<AlternativeName> alternativeNames;
    private List<ArchivalResources> archivalResources;

    public Entity getEntity() {
        Entity entity = new Entity();
        entity.setEid(eid);
        entity.setName(name);
        entity.setSubname(subname);
        entity.setStartDate(startDate);
        entity.setEndDate(endDate);
        entity.setBirthPlace(birthPlace);
        entity.setBirthState(birthState);
        entity.setBirthCountry(birthCountry);
        entity.setDeathPlace(deathPlace);
        entity.setDeathState(deathState);
        entity.setDeathCountry(deathCountry);
        entity.setSummary(summary);
        entity.setDetail(detail);
        entity.setNotes(notes);
        if (StringUtil.isEmpty(photo)) {
            photo = "/files/default.png";
        }
        entity.setPhoto(photo);
        entity.setStatus(status);

        return entity;
    }

    public UserReview getUserReview(User user) {
        UserReview review = new UserReview();

        review.setReviewer(user);
        review.setEid(eid);
        review.setFeedback(feedback);
        review.setStatusDetail(statusDetail);
        review.setStatusEnd(statusEnd);
        review.setStatusStart(statusStart);
        review.setStatusName(statusName);
        review.setStatusNotes(statusNotes);
        review.setStatusSummary(statusSummary);

        return review;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
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

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public List<Occupation> getOccupations() {
        return occupations;
    }

    public void setOccupations(List<Occupation> occupations) {
        this.occupations = occupations;
    }

    public List<RelatedEntity> getRelatedPeople() {
        return relatedPeople;
    }

    public void setRelatedPeople(List<RelatedEntity> relatedPeople) {
        this.relatedPeople = relatedPeople;
    }

    public List<RelatedEntity> getRelatedOrganizations() {
        return relatedOrganizations;
    }

    public void setRelatedOrganizations(List<RelatedEntity> relatedOrganizations) {
        this.relatedOrganizations = relatedOrganizations;
    }

    public List<DigitalResources> getDigitalResources() {
        return digitalResources;
    }

    public void setDigitalResources(List<DigitalResources> digitalResources) {
        this.digitalResources = digitalResources;
    }

    public List<PublishedResources> getPublishedResources() {
        return publishedResources;
    }

    public void setPublishedResources(List<PublishedResources> publishedResources) {
        this.publishedResources = publishedResources;
    }

    public List<AlternativeName> getAlternativeNames() {
        return alternativeNames;
    }

    public void setAlternativeNames(List<AlternativeName> alternativeNames) {
        this.alternativeNames = alternativeNames;
    }

    public List<ArchivalResources> getArchivalResources() {
        return archivalResources;
    }

    public void setArchivalResources(List<ArchivalResources> archivalResources) {
        this.archivalResources = archivalResources;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}
