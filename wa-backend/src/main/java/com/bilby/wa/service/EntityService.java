package com.bilby.wa.service;

import com.bilby.wa.common.StringUtil;
import com.bilby.wa.dao.EntityDao;
import com.bilby.wa.dao.UserDao;
import com.bilby.wa.pojo.*;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class EntityService {

    @Resource
    EntityDao entityDao;
    @Resource
    UserDao userDao;
    @Resource
    UserDetailsServiceImpl userDetailsService;
    @Resource
    NotificationService notificationService;

    /**
     * Create an entity
     * @param entityData entity data (JSON) from user
     * @return response data
     */
    public ResponseInfo createEntity(String entityData) {
        Gson gson = new GsonBuilder()
                .setDateFormat("yyyy/MM/dd")
                .create();
        /* Get information of current user */
        User user = userDetailsService.getCurrentUser();
        try {
            /* Deserialize the JSON data, convert it to a Java object */
            EntityData data = gson.fromJson(entityData, EntityData.class);
            /* If there is already a draft, delete it */
            if (data.getDraftEid() != null) {
                entityDao.deleteEntity(data.getDraftEid());
            }
            /* Get the entity information from that object */
            Entity entity = data.getEntity();
            
            /* entity type: 1 - person; 2 - Orgnisation */
            if (entity.getType() == 1) {
                entityDao.insertPersonEntity(entity);
            } else {
                entityDao.insertOrgEntity(entity);
            }
            /* We can get the auto-generated entity id after the database insertion */
            int eid = entity.getEid();
            /* Save the information of the contributor who created the entity */
            entityDao.insertUserContribute(user.getUid(), eid);
            
            /* Get related people information from the data and save to database */
            if (data.getRelatedPeople() != null) {
                for (RelatedEntity relatedEntity : data.getRelatedPeople()) {
                    relatedEntity.setEid(eid);
                    /* Set the entity type here */
                    relatedEntity.setRelatedEtype(1);
                    entityDao.insertRelatedEntity(relatedEntity);
                }
            }
            /* Get related organization information from the data and save to database */
            if (data.getRelatedOrganizations() != null) {
                for (RelatedEntity relatedEntity : data.getRelatedOrganizations()) {
                    relatedEntity.setEid(eid);
                    relatedEntity.setRelatedEtype(2);
                    entityDao.insertRelatedEntity(relatedEntity);
                }
            }
            /* Get published resources information from the data and save to database */
            if (data.getPublishedResources() != null) {
                for (PublishedResources publishedResources : data.getPublishedResources()) {
                    entityDao.insertPublishedRes(eid, publishedResources.getPrTitle(),
                            publishedResources.getPrPublisher(), publishedResources.getPrUrl(),
                            publishedResources.getPrDate(), publishedResources.getPrNote());
                }
            }
            /* Get digital resources information from the data and save to database */
            if (data.getDigitalResources() != null) {
                for (DigitalResources digitalResources : data.getDigitalResources()) {
                    entityDao.insertDigitalRes(eid, digitalResources.getDrTitle(),
                            digitalResources.getDrDate(), digitalResources.getDrRepository(),
                            digitalResources.getDrUrl(), digitalResources.getDrNote());
                }
            }
            /* Get archival resources information from the data and save to database */
            if (data.getArchivalResources() != null) {
                for (ArchivalResources archivalResources : data.getArchivalResources()) {
                    entityDao.insertArchivalRes(eid, archivalResources.getArRepository(),
                            archivalResources.getArTitle(), archivalResources.getArDate(),
                            archivalResources.getArAbstract(), archivalResources.getArUrl(),
                            archivalResources.getArNote());
                }
            }
            /* Get alternative name information from the data and save to database */
            if (data.getAlternativeNames() != null) {
                for (AlternativeName alternativeName : data.getAlternativeNames()) {
                    entityDao.insertAlternativaName(eid, alternativeName.getAname(), alternativeName.getAtype());
                }
            }
            /* Get occupations information from the data and save to database */
            if (data.getOccupations() != null) {
                for (Occupation occupation: data.getOccupations()) {
                    entityDao.insertEntityOccupation(eid, occupation.getOid());
                }
            }
            
            if (!entity.isDraft()) {
                /* Send message to managers */
                notificationService.addNewEntityMessage(user.getName(), entity.getName(), eid);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseInfo.buildFailure(1006, "Invalid parameters");
        }

        return ResponseInfo.buildSuccess();
    }

    /**
     * Review an entity
     * @param reviewData review data (JSON) from user
     * @return response data
     */
    public ResponseInfo reviewEntity(String reviewData) {
        Gson gson = new GsonBuilder()
                .setDateFormat("yyyy/MM/dd")
                .create();
        /* Get information of current user */
        User user = userDetailsService.getCurrentUser();
        try {
            /* Deserialize the JSON data, convert it to a Java object */
            EntityReviewData data = gson.fromJson(reviewData, EntityReviewData.class);

            /* Get the entity information from that object */
            Entity entity = data.getEntity();
            UserReview review = data.getUserReview(user);
//            System.out.println("Status: " + entity.getStatus());
            entityDao.updateEntity(entity);
            entityDao.insertUserReview(review);

            /* Get related people information from the data and save to database */
            if (data.getRelatedPeople() != null) {
                for (RelatedEntity relatedEntity : data.getRelatedPeople()) {
                    relatedEntity.setRelatedEtype(1);
                    entityDao.updateRelatedEntity(relatedEntity);
                }
            }
            /* Get related organization information from the data and save to database */
            if (data.getRelatedOrganizations() != null) {
                for (RelatedEntity relatedEntity : data.getRelatedOrganizations()) {
                    relatedEntity.setRelatedEtype(2);
                    entityDao.updateRelatedEntity(relatedEntity);
                }
            }
            /* Get published resources information from the data and save to database */
            if (data.getPublishedResources() != null) {
                for (PublishedResources publishedResources : data.getPublishedResources()) {
                    entityDao.updatePublishedRes(publishedResources.getPrid(),
                            publishedResources.getPrTitle(),
                            publishedResources.getPrPublisher(),
                            publishedResources.getPrUrl(),
                            publishedResources.getPrDate(),
                            publishedResources.getPrNote(),
                            publishedResources.getPrStatus());
                }
            }
            /* Get digital resources information from the data and save to database */
            if (data.getDigitalResources() != null) {
                for (DigitalResources digitalResources : data.getDigitalResources()) {
                    entityDao.updateDigitalRes(digitalResources.getDrid(),
                            digitalResources.getDrTitle(),
                            digitalResources.getDrDate(),
                            digitalResources.getDrRepository(),
                            digitalResources.getDrUrl(),
                            digitalResources.getDrNote(),
                            digitalResources.getDrStatus());
                }
            }
            /* Get archival resources information from the data and save to database */
            if (data.getArchivalResources() != null) {
                for (ArchivalResources archivalResources : data.getArchivalResources()) {
                    entityDao.updateArchivalRes(archivalResources.getArid(),
                            archivalResources.getArRepository(),
                            archivalResources.getArTitle(),
                            archivalResources.getArDate(),
                            archivalResources.getArAbstract(),
                            archivalResources.getArUrl(),
                            archivalResources.getArNote(),
                            archivalResources.getArStatus());
                }
            }
            /* Get alternative name information from the data and save to database */
            if (data.getAlternativeNames() != null) {
                for (AlternativeName alternativeName : data.getAlternativeNames()) {
                    entityDao.updateAlternativaName(alternativeName.getAnid(),
                            alternativeName.getAname(),
                            alternativeName.getAtype(),
                            alternativeName.getAstatus());
                }
            }
            /* Get occupations information from the data and save to database */
            if (data.getOccupations() != null) {
                for (Occupation occupation: data.getOccupations()) {
                    entityDao.updateEntityOccupation(occupation.getEoid(),
                            occupation.getOid(),
                            occupation.getOstatus());
                }
            }

            if (data.getStatus() == -1) {
                notificationService.addNewReviewMessage(entityDao.getEntityContributor(entity.getEid()), entity.getEid(), entity.getName());
            } else {
                notificationService.addEntityApprovedMessage(entityDao.getEntityContributor(entity.getEid()), entity.getEid(), entity.getName());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseInfo.buildFailure(1006, "Invalid parameters");
        }

        return ResponseInfo.buildSuccess();
    }

    /**
     * Get a list of all entities
     * @param page page number
     * @param pageSize page size
     * @return response data
     */
    public PageResponseInfo allEntity(Integer page, Integer pageSize, Integer status) {
        /* Set default page number and page size */
        if (page == null) {
            page = 1;
        }
        if (pageSize == null) {
            pageSize = 10;
        }
        /* PagerHelper is a component of a pager framework of MyBatis */
        PageHelper.startPage(page, pageSize);
        List<EntityListItem> entityList;
        if (status == null) {
            entityList = entityDao.selectAllEntityList();
        } else {
            entityList = entityDao.selectAllEntityListWithStatus(status);
        }
        PageInfo<EntityListItem> pageInfo = new PageInfo<>(entityList);
        return PageResponseInfo.buildSuccess(page, pageInfo.getPages(),
                pageInfo.isHasNextPage(), pageInfo.isHasPreviousPage(), entityList);
    }

    /**
     * Get a list of all entities that are waiting for being reviewed
     * @param page page number
     * @param pageSize page size
     * @return response data
     */
    public PageResponseInfo todoEntity(Integer page, Integer pageSize, Integer status) {
        if (page == null) {
            page = 1;
        }
        if (pageSize == null) {
            pageSize = 10;
        }
        PageHelper.startPage(page, pageSize);
        List<EntityListItem> entityList;
        if (status == null) {
            entityList = entityDao.selectToDoEntityList();
        } else {
            entityList = entityDao.selectToDoEntityListWithStatus(status);
        }
        PageInfo<EntityListItem> pageInfo = new PageInfo<>(entityList);
        return PageResponseInfo.buildSuccess(page, pageInfo.getPages(),
                pageInfo.isHasNextPage(), pageInfo.isHasPreviousPage(), entityList);
    }

    /**
     * Get a list of all entities that are created by the current user
     * @param page page number
     * @param pageSize page size
     * @return response data
     */
    public PageResponseInfo allMyEntity(Integer page, Integer pageSize, Boolean draft, Integer status) {
        if (page == null) {
            page = 1;
        }
        if (pageSize == null) {
            pageSize = 10;
        }
        Integer uid = userDetailsService.getCurrentUser().getUid();
        PageHelper.startPage(page, pageSize);
        List<EntityListItem> entityList;
        if (draft != null && draft) {
            entityList = entityDao.selectMyEntityDrafts(uid);
        } else {
            if (status == null) {
                entityList = entityDao.selectMyEntities(uid);
            } else {
                entityList = entityDao.selectMyEntitiesWithStatus(uid, status);
            }
        }
        PageInfo<EntityListItem> pageInfo = new PageInfo<>(entityList);
        return PageResponseInfo.buildSuccess(page, pageInfo.getPages(),
                pageInfo.isHasNextPage(), pageInfo.isHasPreviousPage(), entityList);
    }

    /**
     * Prompt for user inputting related entities
     * @param input user input
     * @param type entity type
     * @return response data
     */
    public ResponseInfo relatedEntityPrompt(String input, Integer type) {
        return ResponseInfo.buildSuccess(entityDao.namePrompt(type, input));
    }

    /**
     * Check whether the user input is a valid entity name
     * @param input user input
     * @return response data
     */
    public ResponseInfo checkRelatedEntity(String input) {
        return ResponseInfo.buildSuccess(entityDao.checkEntityByName(input));
    }

    /**
     * Prompt for user inputting occupation
     * @param input user input
     * @return response data
     */
    public ResponseInfo occupationPrompt(String input) {
        if (StringUtil.isEmpty(input)) {
            return ResponseInfo.buildSuccess(entityDao.occupationPromptEmpty());
        } else {
            return ResponseInfo.buildSuccess(entityDao.occupationPrompt(input));
        }
    }

    /**
     * Check whether the user input is a valid occupation
     * @param input user input
     * @return response data
     */
    public ResponseInfo checkOccupation(String input) {
        return ResponseInfo.buildSuccess(entityDao.checkOccupation(input));
    }

    /**
     * Delete an entity
     * @param eid entity id
     * @return response data
     */
    public ResponseInfo deleteEntity(Integer eid) {
        /* get the current user */
        User user = userDetailsService.getCurrentUser();
        /* get the creator of the entity */
        Integer conID = entityDao.getEntityContributor(eid);
        EntityReviewDetail detail = entityDao.selectEntityDetail(eid);
        
        /* entity doesn't exist */
        if (conID == null) {
            return ResponseInfo.buildFailure(1007, "Entity doesn't exist!");
        }

        /* user have the permission to delete this entity */
        if (user.getRole().getRid() == 3 || user.getUid().equals(conID)) {
            if (user.getRole().getRid() == 1 && detail.getStatus() == 3) {
                return ResponseInfo.buildFailure(1008, "You can only delete the entity before it is published");
            }
            entityDao.deleteEntity(eid);
            return ResponseInfo.buildSuccess();
        }

        else {
            /* user doesn't have the permission to delete this entity */
            return ResponseInfo.buildFailure(1008, "Permission denied!");
        }
    }

    /**
     * Get detail information of an entity
     * @param eid entity id
     * @return response data
     */
    public ResponseInfo getEntityDetail(Integer eid) {
        User user = userDetailsService.getCurrentUser();
        Integer conID = entityDao.getEntityContributor(eid);
        if (conID == null) {
            return ResponseInfo.buildFailure(1007, "Entity doesn't exist!");
        }

        /* Check whether user has the permission to view information of the entity */
        if (user.getRole().getRid() > 1 || user.getUid().equals(conID)) {
            EntityReviewDetail detail = entityDao.selectEntityDetail(eid);
            System.out.println(new Gson().toJson(detail));
            detail.setReview(entityDao.selectUserReview(eid));
            detail.setContributor(userDao.selectContributorByEntity(eid));
            return ResponseInfo.buildSuccess(detail);
        } else {
            return ResponseInfo.buildFailure(1008, "Permission denied!");
        }
    }
}
