package com.bilby.wa.controller;

import com.bilby.wa.pojo.PageResponseInfo;
import com.bilby.wa.pojo.ResponseInfo;
import com.bilby.wa.service.NotificationService;
import com.bilby.wa.service.UserDetailsServiceImpl;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    UserDetailsServiceImpl userDetailsService;
    @Resource
    NotificationService notificationService;

    /**
     * Update password of a user
     * @param oldPassword old password
     * @param newPassword new password
     * @return result information wrapped in ResponseInfo
     */
    @PutMapping("/password")
    public ResponseInfo updatePassword(@RequestParam String oldPassword, @RequestParam String newPassword) {
        return userDetailsService.updatePassword(oldPassword, newPassword);
    }

    /**
     * Get information of current user
     * @return result information wrapped in ResponseInfo
     */
    @GetMapping("/me")
    public ResponseInfo getInfo() {
        return userDetailsService.getInfo();
    }

    @GetMapping("/message")
    public PageResponseInfo getUserMessage(Integer page, Integer pageSize) {
        return notificationService.getMessageList(page, pageSize);
    }

    @PostMapping("/email")
    public ResponseInfo receiveEmail(Boolean receive) {
        return userDetailsService.setReceiveEmail(receive);
    }
}
