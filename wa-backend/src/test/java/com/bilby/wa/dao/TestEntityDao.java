package com.bilby.wa.dao;

import com.bilby.wa.pojo.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author Yangzhe Xie
 * @date 13/9/19
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class TestEntityDao {

    private EntityData entityData;
    @Resource
    private EntityDao entityDao;

    @Before
    public void initEntityData() {
        entityData = new EntityData();
        entityData.setName("Demo, Demo");
        entityData.setPhoto("http://demo.com/demo.png");
        entityData.setType(1);
        entityData.setSubname("Doctor");
        entityData.setStartDate("2019");
        entityData.setEndDate("2019");
        entityData.setBirthPlace("demo");
        entityData.setBirthState("demo");
        entityData.setBirthCountry("demo");
        entityData.setDeathPlace("demo");
        entityData.setDeathState("demo");
        entityData.setDeathCountry("demo");
        entityData.setSummary("demo");
        entityData.setDetail("demo");
        entityData.setNotes("demo");
        entityData.setDraft(false);

        List<RelatedEntity> relatedWomen = new ArrayList<>();
        RelatedEntity women = new RelatedEntity();
        women.setRelatedEid(10);
        women.setRelationship(1);
        women.setRelatedEname("Demo, Demo");
        relatedWomen.add(women);
        relatedWomen.add(women);
        entityData.setRelatedPeople(relatedWomen);

        List<RelatedEntity>relatedOrganizations = new ArrayList<>();
        RelatedEntity organization = new RelatedEntity();
        organization.setRelatedEid(10);
        organization.setRelationship(1);
        organization.setRelatedEname("Demo, Demo");
        relatedOrganizations.add(organization);
        relatedOrganizations.add(organization);
        entityData.setRelatedOrganizations(relatedOrganizations);

        List<DigitalResources> digitalResources = new ArrayList<>();
        DigitalResources resources = new DigitalResources();
        resources.setDrNote("test");
        resources.setDrDate("2019");
        resources.setDrTitle("demo");
        resources.setDrRepository("test");
        resources.setDrUrl("http://demo.com/demo.png");
        digitalResources.add(resources);
        digitalResources.add(resources);
        entityData.setDigitalResources(digitalResources);

        List<PublishedResources> publishedResources = new ArrayList<>();
        PublishedResources pr = new PublishedResources();
        pr.setPrDate("2019");
        pr.setPrPublisher("demo");
        pr.setPrNote("demo");
        pr.setPrTitle("demo");
        pr.setPrUrl("http://demo.com/demo.html");
        publishedResources.add(pr);
        publishedResources.add(pr);
        entityData.setPublishedResources(publishedResources);

        List<ArchivalResources> archivalResources = new ArrayList<>();
        ArchivalResources ar = new ArchivalResources();
        ar.setArAbstract("demo");
        ar.setArDate("2019");
        ar.setArNote("demo");
        ar.setArRepository("demo");
        ar.setArTitle("demo");
        ar.setArUrl("demo");
        archivalResources.add(ar);
        archivalResources.add(ar);
        entityData.setArchivalResources(archivalResources);

        List<AlternativeName> alternativeNames = new ArrayList<>();
        AlternativeName alternativeName = new AlternativeName();
        alternativeName.setAname("demo");
        alternativeName.setAtype(1);
        alternativeNames.add(alternativeName);
        alternativeNames.add(alternativeName);
        entityData.setAlternativeNames(alternativeNames);

        List<Occupation> occupations = new ArrayList<>();
        Occupation occupation = new Occupation(7, "Academic");
        occupations.add(occupation);
        entityData.setOccupations(occupations);
    }

    @Test
    public void testSelectMyEntities() {
        Assert.assertFalse(entityDao.selectMyEntities(1019).isEmpty());
    }

    @Test
    public void testInsertPersonEntity() {
        Entity entity = entityData.getEntity();
        entity.setType(1);
        entityDao.insertPersonEntity(entity);
        Assert.assertTrue(entity.getEid() > 0);
    }

    @Test
    public void testInsertOrgEntity() {
        Entity entity = entityData.getEntity();
        entity.setType(2);
        entityDao.insertOrgEntity(entity);
        Assert.assertTrue(entity.getEid() > 0);
    }

    @Test
    public void testSelectAllEntityList() {
        Assert.assertFalse(entityDao.selectAllEntityList().isEmpty());
    }

    @Test
    public void testSelectToDoEntityList() {
        Assert.assertFalse(entityDao.selectToDoEntityList().isEmpty());
    }

    @Test
    public void testNamePrompt() {
        List<EntityNamePrompt> list = entityDao.namePrompt(1, "Y");
        Assert.assertFalse(list.isEmpty());
    }

    @Test
    public void testCheckEntity() {
        Integer id = entityDao.checkEntityByName("Yangzhe, Xie");
        Assert.assertNotNull(id);
    }
    
    @Test
    public void testOccupationPrompt() {
        List<EntityOccupationPrompt> list = entityDao.occupationPrompt("pr");
        Assert.assertFalse(list.isEmpty());
    }

    @Test
    public void testOccupationPromptEmpty() {
        List<EntityOccupationPrompt> list = entityDao.occupationPromptEmpty();
        Assert.assertFalse(list.isEmpty());
    }

    @Test
    public void testCheckOccupation() {
        Integer id = entityDao.checkOccupation("Professor");
        Assert.assertNotNull(id);
    }

    @Test
    public void testDeleteEntity() {
        entityDao.deleteEntity(3);
    }
    
    @Test
    public void testGetEntityContributor() {
        Integer conId = entityDao.getEntityContributor(4);
        System.out.println(conId);
    }
    
    @Test
    public void testSelectEntityDetail() {
        System.out.println(new Gson().toJson(entityDao.selectEntityDetail(51)));
    }
    
    @Test
    public void testSelectUserReview() {
        System.out.println(new Gson().toJson(entityDao.selectUserReview(52)));
    }

    @Test
    public void testInsertUserReview() {
        UserReview review = new UserReview();
        review.setReviewer(new User(1018));
        review.setEid(22);
        review.setFeedback("1231231ajksdhajsdhkajdhasd23");
        review.setStatusDetail(1);
        review.setStatusEnd(1);
        review.setStatusStart(1);
        review.setStatusName(1);
        review.setStatusNotes(1);
        review.setStatusSummary(1);
        entityDao.insertUserReview(review);
    }

    @Test
    public void testUpdatePublishedRes() {
        entityDao.updatePublishedRes(35, "asd", "asd", "asd", "asd", "asd", 1);
    }

    @Test
    public void testUpdateDigitalRes() {
        entityDao.updateDigitalRes(36, "asd", "asd", "asd", "asd", "asd", 1);
    }

    @Test
    public void testArchivalDigitalRes() {
        entityDao.updateArchivalRes(35, "asd", "asd", "asd", "asd", "asd", "asd", 1);
    }

    @Test
    public void testUpdateAlternativaName() {
        entityDao.updateAlternativaName(14, "zxc", 3, 1);
    }

    @Test
    public void testUpdateEntityOccupation() {
        entityDao.updateEntityOccupation(1, 500, 1);
    }

    @Test
    public void testUpdateRelatedEntity() {
        RelatedEntity relatedEntity = new RelatedEntity();
        relatedEntity.setRoid(47);
        relatedEntity.setStatusRe(1);
        relatedEntity.setRelatedEname("123123123");
        relatedEntity.setRelationship(4);
        relatedEntity.setRelatedEtype(2);
        entityDao.updateRelatedEntity(relatedEntity);
    }
}
