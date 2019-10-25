package com.bilby.wa.service;

import com.bilby.wa.pojo.ResponseInfo;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;

/**
 * @author Yangzhe Xie
 * @date 24/9/19
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TestNotificationService {
    @Resource
    NotificationService notificationService;

    @Test
    public void testSendSimpleMail() {
        notificationService.sendSimpleMail("joseph.vuoto@gmail.com", "Test", "Test");
    }

    @Test
    public void testSendHtmlMail() {
        notificationService.sendHtmlMail("joseph.vuoto@gmail.com", "Test", "<h1>Test</h1>");
    }
}
