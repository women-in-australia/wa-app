package com.bilby.wa;

import com.bilby.wa.controller.EntityController;
import com.bilby.wa.dao.EntityDao;
import com.bilby.wa.dao.UserDao;
import com.bilby.wa.pojo.*;
import com.bilby.wa.service.EntityService;
import com.bilby.wa.service.NotificationService;
import com.bilby.wa.service.UserDetailsServiceImpl;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.util.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WaBackendApplicationTests {
    
    @Resource
    UserDao userDao;
    @Resource
    EntityService entityService;
    @Resource
    NotificationService notificationService;
    @Resource
    EntityDao entityDao;
    @Resource
    UserDetailsServiceImpl userDetailsService;
    @Resource
    EntityController entityController;

    @Test
    public void contextLoads() {
    }

    @Test
    public void test() {

    }

    @Test
    public void test1() {
        EntityReviewDetail detail = entityDao.selectEntityDetail(51);
        detail.setReview(entityDao.selectUserReview(21));
        detail.setContributor(userDao.selectContributorByEntity(21));
        System.out.println(new Gson().toJson(detail));
}

    private void demoJson1() {
        EntityData entityData = new EntityData();
        entityData.setDraftEid(1234);
        entityData.setName("123123123123123");
        entityData.setPhoto("http://demo.com/demo.png");
        entityData.setType(1);
        entityData.setSubname("asdasdadas");
        entityData.setStartDate("2019");
        entityData.setEndDate("2012319");
        entityData.setBirthPlace("asd");
        entityData.setBirthState("asd");
        entityData.setBirthCountry("asd");
        entityData.setDeathPlace("dasdemo");
        entityData.setDeathState("desfgdfgmo");
        entityData.setDeathCountry("dgdgtgemo");
        entityData.setSummary("de324345mo");
        entityData.setDetail("demetrto");
        entityData.setNotes("dedfgdgfmo");
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

        Gson gson = new GsonBuilder()
                .setDateFormat("yyyy-MM-dd")
                .create();
        System.out.println(gson.toJson(entityData));

        Entity entity = entityData.getEntity();
        entity.setEid(52);
        entity.setStatus(1);
        entityDao.updateEntity(entity);
    }

    private void demoJson2() {
        EntityReviewData entityData = new EntityReviewData();
        entityData.setEid(43);
        entityData.setName("123123123123123");
        entityData.setPhoto("http://demo.com/demo.png");
        entityData.setSubname("asdasdadas");
        entityData.setStartDate("2019");
        entityData.setEndDate("2012319");
        entityData.setBirthPlace("asd");
        entityData.setBirthState("asd");
        entityData.setBirthCountry("asd");
        entityData.setDeathPlace("dasdemo");
        entityData.setDeathState("desfgdfgmo");
        entityData.setDeathCountry("dgdgtgemo");
        entityData.setSummary("de324345mo");
        entityData.setDetail("demetrto");
        entityData.setNotes("dedfgdgfmo");
        entityData.setStatus(1);

        entityData.setFeedback("28346792374923749237492387");
        entityData.setStatusDetail(1);
        entityData.setStatusEnd(1);
        entityData.setStatusStart(1);
        entityData.setStatusName(1);
        entityData.setStatusNotes(1);
        entityData.setStatusSummary(1);

        List<RelatedEntity> relatedWomen = new ArrayList<>();
        RelatedEntity women = new RelatedEntity();
        women.setRoid(47);
        women.setRelatedEid(10);
        women.setRelationship(2);
        women.setRelatedEname("asdf");
        women.setStatusRe(1);
        relatedWomen.add(women);
        entityData.setRelatedPeople(relatedWomen);

        List<RelatedEntity>relatedOrganizations = new ArrayList<>();
        RelatedEntity organization = new RelatedEntity();
        organization.setRelatedEid(10);
        organization.setRoid(49);
        organization.setRelationship(2);
        organization.setRelatedEname("cvbxcb");
        organization.setStatusRe(1);
        relatedOrganizations.add(organization);
        entityData.setRelatedOrganizations(relatedOrganizations);

        List<DigitalResources> digitalResources = new ArrayList<>();
        DigitalResources resources = new DigitalResources();
        resources.setDrNote("tsfdwerest");
        resources.setDrDate("20wer19");
        resources.setDrid(41);
        resources.setDrTitle("dedsfgdfgdgmo");
        resources.setDrRepository("tedfsgdfgst");
        resources.setDrUrl("http://dsfsaregtertcom/demo.png");
        resources.setDrStatus(1);
        digitalResources.add(resources);
        entityData.setDigitalResources(digitalResources);

        List<PublishedResources> publishedResources = new ArrayList<>();
        PublishedResources pr = new PublishedResources();
        pr.setPrDate("2456456019");
        pr.setPrid(41);
        pr.setPrPublisher("dedfsgdgmo");
        pr.setPrNote("dwerwertemo");
        pr.setPrTitle("dedfgsdgmo");
        pr.setPrStatus(1);
        pr.setPrUrl("http://dretwetemo.com/demo.html");
        publishedResources.add(pr);
        entityData.setPublishedResources(publishedResources);

        List<ArchivalResources> archivalResources = new ArrayList<>();
        ArchivalResources ar = new ArchivalResources();
        ar.setArAbstract("demgereto");
        ar.setArDate("20fhtrt19");
        ar.setArNote("dem3453o");
        ar.setArRepository("de345mo");
        ar.setArTitle("demdhgo");
        ar.setArUrl("deyuimo");
        ar.setArStatus(1);
        ar.setArid(41);
        archivalResources.add(ar);
        entityData.setArchivalResources(archivalResources);

        List<AlternativeName> alternativeNames = new ArrayList<>();
        AlternativeName alternativeName = new AlternativeName();
        alternativeName.setAname("demsfsdfo");
        alternativeName.setAtype(1);
        alternativeName.setAnid(21);
        alternativeName.setAstatus(1);
        alternativeNames.add(alternativeName);
        entityData.setAlternativeNames(alternativeNames);

        List<Occupation> occupations = new ArrayList<>();
        Occupation occupation = new Occupation(7, "Academic");
        occupation.setEoid(1);
        occupation.setOstatus(1);
        occupations.add(occupation);
        entityData.setOccupations(occupations);

        Gson gson = new GsonBuilder()
                .setDateFormat("yyyy-MM-dd")
                .create();
        System.out.println(gson.toJson(entityData));
    }

    @Test
    public void testCreateEntity() {
        EntityData entityData = new EntityData();
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

        Gson gson = new GsonBuilder()
                .setDateFormat("yyyy-MM-dd")
                .create();
        entityService.createEntity(gson.toJson(entityData));
    }

    private void testInsert(EntityData data) {
        User user = new User();
        user.setUid(1018);
        Entity entity = data.getEntity();
        if (entity.getType() == 1) {
            entityDao.insertPersonEntity(entity);
        } else {
            entityDao.insertOrgEntity(entity);
        }
        int eid = entity.getEid();
        entityDao.insertUserContribute(user.getUid(), eid);
        if (data.getRelatedPeople() != null) {
            for (RelatedEntity relatedEntity : data.getRelatedPeople()) {
                relatedEntity.setEid(eid);
                entityDao.insertRelatedEntity(relatedEntity);
            }
        }
        if (data.getRelatedOrganizations() != null) {
            for (RelatedEntity relatedEntity : data.getRelatedOrganizations()) {
                relatedEntity.setEid(eid);
                entityDao.insertRelatedEntity(relatedEntity);
            }
        }
        if (data.getPublishedResources() != null) {
            for (PublishedResources publishedResources : data.getPublishedResources()) {
                entityDao.insertPublishedRes(eid, publishedResources.getPrTitle(),
                        publishedResources.getPrPublisher(), publishedResources.getPrUrl(),
                        publishedResources.getPrDate(), publishedResources.getPrNote());
            }
        }
        if (data.getDigitalResources() != null) {
            for (DigitalResources digitalResources : data.getDigitalResources()) {
                entityDao.insertDigitalRes(eid, digitalResources.getDrTitle(),
                        digitalResources.getDrDate(), digitalResources.getDrRepository(),
                        digitalResources.getDrUrl(), digitalResources.getDrNote());
            }
        }
        if (data.getArchivalResources() != null) {
            for (ArchivalResources archivalResources : data.getArchivalResources()) {
                entityDao.insertArchivalRes(eid, archivalResources.getArRepository(),
                        archivalResources.getArTitle(), archivalResources.getArDate(),
                        archivalResources.getArAbstract(), archivalResources.getArUrl(),
                        archivalResources.getArNote());
            }
        }
        if (data.getAlternativeNames() != null) {
            for (AlternativeName alternativeName: data.getAlternativeNames()) {
                entityDao.insertAlternativaName(eid, alternativeName.getAname(), alternativeName.getAtype());
            }
        }
        if (data.getOccupations() != null) {
            for (Occupation occupation: data.getOccupations()) {
                entityDao.insertEntityOccupation(eid, occupation.getOid());
            }
        }
    }

    public static void main(String[] args) {

    }
}
