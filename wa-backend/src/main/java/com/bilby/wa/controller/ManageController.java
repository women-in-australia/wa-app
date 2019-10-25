package com.bilby.wa.controller;

import com.bilby.wa.pojo.PageResponseInfo;
import com.bilby.wa.pojo.ResponseInfo;
import com.bilby.wa.service.UserDetailsServiceImpl;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/manage")
public class ManageController {
    @Resource
    UserDetailsServiceImpl userDetailsService;

    /**
     * Activate a user
     * @param uid user id
     * @return result information wrapped in ResponseInfo
     */
    @PutMapping("/user/activate")
    @PreAuthorize("hasRole('manager')")
    public ResponseInfo activateUser(@RequestParam Integer uid) {
        return userDetailsService.enableUser(uid);
    }

    /**
     * Reject a user application
     * @param uid user id
     * @return result information wrapped in ResponseInfo
     */
    @PutMapping("/user/reject")
    @PreAuthorize("hasRole('manager')")
    public ResponseInfo deactivateUser(@RequestParam Integer uid, String feedback) {
        return userDetailsService.rejectUser(uid, feedback);
    }

    /**
     * Get a list of all user
     * @param page page number
     * @param pageSize page size
     * @param review review status
     * @return result information wrapped in PageResponseInfo
     */
    @GetMapping("/user/all")
    @PreAuthorize("hasRole('manager')")
    public PageResponseInfo getAllUser(Integer page, Integer pageSize, Integer review) {
        return userDetailsService.allUser(page, pageSize, review);
    }

    /**
     * Change role of an user
     * @param uid user id
     * @param rid role id
     * @return result information wrapped in ResponseInfo
     */
    @PutMapping("/user/role")
    @PreAuthorize("hasRole('manager')")
    public ResponseInfo modifyRole(@RequestParam Integer uid, @RequestParam Integer rid) {
        return userDetailsService.modifyRole(uid, rid);
    }

    /**
     * Get detail information of an user
     * @param uid user id
     * @return result information wrapped in ResponseInfo
     */
    @GetMapping("/user/detail")
    @PreAuthorize("hasRole('manager')")
    public ResponseInfo getUserDetail(@RequestParam Integer uid) {
        return userDetailsService.getUserDetail(uid);
    }

    /**
     * Invite a user
     * @param email user email
     * @param role user role id
     * @param message invitation message
     * @return result information wrapped in ResponseInfo
     */
    @PostMapping("/user/invite")
    @PreAuthorize("hasRole('manager')")
    public ResponseInfo inviteUser(@RequestParam String email, @RequestParam Integer role, String message) {
        return userDetailsService.inviteUser(email, role, message);
    }
}
