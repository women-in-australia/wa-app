package com.bilby.wa.pojo;

import com.bilby.wa.common.StringUtil;

import java.util.List;

public class EntityData {
    private Integer draftEid;
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
    private String photo;

    private List<Occupation> occupations;
    private List<RelatedEntity> relatedPeople;
    private List<RelatedEntity> relatedOrganizations;
    private List<DigitalResources> digitalResources;
    private List<PublishedResources> publishedResources;
    private List<AlternativeName> alternativeNames;
    private List<ArchivalResources> archivalResources;

    public Entity getEntity() {
        Entity entity = new Entity();
        entity.setType(type);
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
        entity.setIsDraft(isDraft);
        if (StringUtil.isEmpty(photo)) {
            photo = "/files/default.png";
        }
        entity.setPhoto(photo);
        entity.setStatus(0);

        return entity;
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

    public List<Occupation> getOccupations() {
        return occupations;
    }

    public void setOccupations(List<Occupation> occupations) {
        this.occupations = occupations;
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

    public boolean isDraft() {
        return isDraft;
    }

    public void setDraft(boolean draft) {
        isDraft = draft;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
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

    public Integer getDraftEid() {
        return draftEid;
    }

    public void setDraftEid(Integer draftEid) {
        this.draftEid = draftEid;
    }
}
