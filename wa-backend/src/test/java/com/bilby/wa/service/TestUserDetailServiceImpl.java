package com.bilby.wa.service;

import com.bilby.wa.pojo.PageResponseInfo;
import com.bilby.wa.pojo.ResponseInfo;
import com.google.gson.Gson;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;

/**
 * @author Yangzhe Xie
 * @date 24/9/19
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TestUserDetailServiceImpl {
    @Resource
    UserDetailsServiceImpl userDetailsService;
    Integer uid = 1022;

    @Test
    public void testLoadUserByUsername() {
        UserDetails result = userDetailsService.loadUserByUsername("manager@test.com");
        Assert.assertNotNull(result);
    }

    @Test
    public void testModifyRole() {
        ResponseInfo responseInfo = userDetailsService.modifyRole(uid, 2);
        Assert.assertEquals((int) responseInfo.getCode(), 200);
    }

    @Test
    public void testDoRegister() {
        ResponseInfo responseInfo = userDetailsService.doRegister("test1@test.com",
                "1234abcd",
                "name",
                "phone",
                "address",
                "motivation",
                "experience",
                "invite");
        Assert.assertEquals((int) responseInfo.getCode(), 200);
    }

    @Test
    public void testEnableUser() {
        ResponseInfo responseInfo = userDetailsService.enableUser(uid);
        Assert.assertEquals((int) responseInfo.getCode(), 200);
    }

    @Test
    public void testRejectUser() {
        ResponseInfo responseInfo = userDetailsService.rejectUser(uid, "");
        Assert.assertEquals((int) responseInfo.getCode(), 200);
    }

    @Test
    public void testAllUser() {
        PageResponseInfo responseInfo = userDetailsService.allUser(1, 10, 1);
        System.out.println(new Gson().toJson(responseInfo));
        Assert.assertEquals((int) responseInfo.getCode(), 200);
    }

    @Test
    public void testGetUserDetail() {
        ResponseInfo responseInfo = userDetailsService.getUserDetail(uid);
        Assert.assertEquals((int) responseInfo.getCode(), 200);
    }
}
