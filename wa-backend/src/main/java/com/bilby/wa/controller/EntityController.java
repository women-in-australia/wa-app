package com.bilby.wa.controller;

import com.bilby.wa.exception.UploadException;
import com.bilby.wa.pojo.PageResponseInfo;
import com.bilby.wa.pojo.ResponseInfo;
import com.bilby.wa.service.EntityService;
import com.bilby.wa.service.UploadService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;

@RestController
@RequestMapping("/entity")
public class EntityController {

    @Resource
    EntityService entityService;
    @Resource
    UploadService uploadService;

    /**
     * Create an entity
     * @param entityData json data of an entity from user.
     *                   there is a field called isDraft (boolean),
     *                   which indicate whether it is a draft
     * @return result information wrapped in ResponseInfo
     */
    @PostMapping("/create")
    public ResponseInfo createEntity(@RequestParam String entityData) {
        return entityService.createEntity(entityData);
    }

    /**
     * Create an entity
     * @param reviewData json data of an entity from user.
     * @return result information wrapped in ResponseInfo
     */
    @PostMapping("/review")
    @PreAuthorize("hasRole('manager') or hasRole('curator')")
    public ResponseInfo reviewEntity(@RequestParam String reviewData) {
        return entityService.reviewEntity(reviewData);
    }

    /**
     * Upload a file
     * @param file file that user uploaded
     * @param index the index of file
     * @return result information wrapped in ResponseInfo
     * @throws UploadException error uploading
     */
    @PostMapping("/file")
    public ResponseInfo uploadFile(@RequestParam MultipartFile file, @RequestParam Integer index) throws UploadException {
        return uploadService.uploadFile(file, index);
    }

    /**
     * Get a list of all entities
     * @param page page number
     * @param pageSize page size
     * @return result information wrapped in PageResponseInfo
     */
    @GetMapping("/all")
    @PreAuthorize("hasRole('manager') or hasRole('curator')")
    public PageResponseInfo allEntities(Integer page, Integer pageSize, Integer status) {
        return entityService.allEntity(page, pageSize, status);
    }

    /**
     * Get a list of all unreviewed entities
     * @param page page number
     * @param pageSize page size
     * @return result information wrapped in PageResponseInfo
     */
    @GetMapping("/todo")
    @PreAuthorize("hasRole('manager') or hasRole('curator')")
    public PageResponseInfo todoEntities(Integer page, Integer pageSize, Integer status) {
        return entityService.todoEntity(page, pageSize, status);
    }

    /**
     * Get a list of all entities created by the current user
     * @param page page number
     * @param pageSize page size
     * @param draft whether it is a draft
     * @return result information wrapped in PageResponseInfo
     */
    @GetMapping("/my")
    public PageResponseInfo allMyEntities(Integer page, Integer pageSize, Boolean draft, Integer status) {
        return entityService.allMyEntity(page, pageSize, draft, status);
    }

    /**
     * Get information about related information of user input
     * @param input user input
     * @param type entity type
     * @return result information wrapped in ResponseInfo
     */
    @GetMapping("/related/prompt")
    public ResponseInfo relatedEntityPrompt(@RequestParam String input,
                                            @RequestParam Integer type) {
        return entityService.relatedEntityPrompt(input, type);
    }

    /**
     * Check if the user input is an valid entity name
     * @param input user input
     * @return result information wrapped in ResponseInfo
     */
    @GetMapping("/related/check")
    public ResponseInfo checkEntityPrompt(@RequestParam String input) {
        return entityService.checkRelatedEntity(input);
    }

    /**
     * Get name about occupation based on user input
     * @param input user input
     * @return result information wrapped in ResponseInfo
     */
    @GetMapping("/occupation/prompt")
    public ResponseInfo occupationPrompt(@RequestParam String input) {
        return entityService.occupationPrompt(input);
    }

    /**
     * Check if the user input is an valid occupation
     * @param input user input
     * @return result information wrapped in ResponseInfo
     */
    @GetMapping("/occupation/check")
    public ResponseInfo checkOccupation(@RequestParam String input) {
        return entityService.checkOccupation(input);
    }

    /**
     * Delete an entity
     * @param eid entity id
     * @return result information wrapped in ResponseInfo
     */
    @DeleteMapping("/delete")
    public ResponseInfo deleteEntity(@RequestParam Integer eid) {
        return entityService.deleteEntity(eid);
    }

    /**
     * Get detail information of an entity
     * @param eid entity id
     * @return result information wrapped in ResponseInfo
     */
    @GetMapping("/detail")
    public ResponseInfo getEntityDetail(@RequestParam Integer eid) {
        return entityService.getEntityDetail(eid);
    }
}
