package com.bilby.wa.controller;

import com.bilby.wa.pojo.ResponseInfo;
import com.bilby.wa.service.UserDetailsServiceImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Resource
    private UserDetailsServiceImpl userDetailsService;

    /**
     * User registration
     * @param email user email
     * @param password user password
     * @param name user name
     * @param phoneNumber user phone number
     * @param address user address
     * @param motivation user motivation
     * @param experience user experience
     * @param invite user invitation code
     * @return result information wrapped in ResponseInfo
     */
    @PostMapping("/register")
    public ResponseInfo registerUser(@RequestParam String email,
                                     @RequestParam String password,
                                     @RequestParam String name,
                                     @RequestParam String phoneNumber,
                                     @RequestParam String address,
                                     @RequestParam String motivation,
                                     @RequestParam String experience,
                                     String invite) {
        return userDetailsService.doRegister(email, password, name, phoneNumber,
                address, motivation, experience, invite);
    }
}
