package com.bilby.wa.dao;

import com.bilby.wa.pojo.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Data access object for entities
 * Mapper location: resources/mappers/EntityMapper.xml
 */
@Mapper
public interface EntityDao {

    EntityReviewDetail selectEntityDetail(Integer eid);

    UserReview selectUserReview(Integer eid);

    List<EntityListItem> selectMyEntities(Integer uid);

    List<EntityListItem> selectMyEntitiesWithStatus(@Param("uid") Integer uid,
                                                    @Param("status") Integer status);

    List<EntityListItem> selectMyEntityDrafts(Integer uid);

    void insertPersonEntity(Entity entity);

    void insertOrgEntity(Entity entity);

    void updateEntity(Entity entity);

    void insertUserReview(UserReview userReview);

    List<EntityListItem> selectAllEntityList();

    List<EntityListItem> selectAllEntityListWithStatus(Integer status);

    List<EntityListItem> selectToDoEntityList();

    List<EntityListItem> selectToDoEntityListWithStatus(Integer status);

    void insertRelatedEntity(RelatedEntity relatedEntity);

    void updateRelatedEntity(RelatedEntity relatedEntity);

    void insertPublishedRes(@Param("eid") Integer eid,
                            @Param("title") String title,
                            @Param("publisher") String publisher,
                            @Param("url") String url,
                            @Param("date") String date,
                            @Param("note") String note);

    void updatePublishedRes(@Param("prid") Integer prid,
                            @Param("title") String title,
                            @Param("publisher") String publisher,
                            @Param("url") String url,
                            @Param("date") String date,
                            @Param("note") String note,
                            @Param("status") Integer status);

    void insertDigitalRes(@Param("eid") Integer eid,
                          @Param("title") String title,
                          @Param("date") String date,
                          @Param("repository") String repository,
                          @Param("url") String url,
                          @Param("note") String note);

    void updateDigitalRes(@Param("drid") Integer drid,
                          @Param("title") String title,
                          @Param("date") String date,
                          @Param("repository") String repository,
                          @Param("url") String url,
                          @Param("note") String note,
                          @Param("status") Integer status);

    void insertArchivalRes(@Param("eid") Integer eid,
                           @Param("repository") String repository,
                           @Param("title") String title,
                           @Param("date") String date,
                           @Param("abstract") String abs,
                           @Param("url") String url,
                           @Param("note") String note);

    void updateArchivalRes(@Param("arid") Integer arid,
                           @Param("repository") String repository,
                           @Param("title") String title,
                           @Param("date") String date,
                           @Param("abstract") String abs,
                           @Param("url") String url,
                           @Param("note") String note,
                           @Param("status") Integer status);

    void insertAlternativaName(@Param("eid") Integer eid,
                               @Param("aname") String aname,
                               @Param("atype") Integer atype);

    void updateAlternativaName(@Param("anid") Integer anid,
                               @Param("aname") String aname,
                               @Param("atype") Integer atype,
                               @Param("astatus") Integer astatus);

    void insertUserContribute(@Param("uid") Integer uid,
                              @Param("eid") Integer eid);

    void insertEntityOccupation(@Param("eid") Integer eid,
                                @Param("oid") Integer oid);

    void updateEntityOccupation(@Param("eoid") Integer eoid,
                                @Param("oid") Integer oid,
                                @Param("status") Integer status);

    List<EntityNamePrompt> namePrompt(@Param("type") Integer type,
                                      @Param("input") String input);

    Integer checkEntityByName(String input);

    List<EntityOccupationPrompt> occupationPrompt(@Param("input") String input);

    List<EntityOccupationPrompt> occupationPromptEmpty();

    Integer checkOccupation(String input);

    void deleteEntity(Integer eid);

    Integer getEntityContributor(Integer eid);
}
