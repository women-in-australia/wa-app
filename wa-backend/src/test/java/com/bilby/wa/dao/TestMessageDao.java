package com.bilby.wa.dao;

import com.bilby.wa.pojo.Message;
import com.bilby.wa.pojo.User;
import com.bilby.wa.pojo.UserRole;
import com.google.gson.Gson;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author Yangzhe Xie
 * @date 13/9/19
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class TestMessageDao {
    
    @Resource
    private MessageDao messageDao;
    
    @Test
    public void testSelectAllMessageById() {
        Assert.assertFalse(messageDao.selectAllMessageById(1019).isEmpty());
    }

    @Test
    public void testInsertMessage() {
        Message message = new Message();
        message.setUid(1019);
        message.setContent("testMessage");
        message.setLink("123123");
        message.setType(1);
        messageDao.insertMessage(message);
    }
}
