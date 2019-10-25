package com.bilby.wa.dao;

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
public class TestUserDao {
    
    @Resource
    private UserDao userDao;
    
    @Test
    public void testSelectAllUsers() {
        Assert.assertFalse(userDao.selectAllUsers().isEmpty());
    }

    @Test
    public void testSelectUserToReview() {
        List<User> users = userDao.selectUsersToReview();
        for (User user: users) {
            Assert.assertEquals(user.getEnabled(), 0);
        }
    }

    @Test
    public void testSelectUsersEnabled() {
        List<User> users = userDao.selectUsersEnabled();
        for (User user: users) {
            Assert.assertEquals(user.getEnabled(), 1);
        }
    }

    @Test
    public void testSelectUsersRejected() {
        List<User> users = userDao.selectUsersRejected();
        for (User user: users) {
            Assert.assertEquals(user.getEnabled(), -1);
        }
    }

    @Test
    public void testSelectUserByUserName() {
        User user = userDao.selectUserByUserName("curator@test.com");
        Assert.assertEquals((int) user.getUid(), 1018);
    }

    @Test
    public void testSelectById() {
        User user = userDao.selectById(1018);
        Assert.assertEquals(user.getEmail(), "curator@test.com");
    }

    @Test
    public void testEnableUser() {
        userDao.enableUser(1022);
        Assert.assertEquals(userDao.selectById(1022).getEnabled(), 1);
    }

    @Test
    public void testRejectUser() {
        userDao.rejectUser(1022);
        Assert.assertEquals(userDao.selectById(1022).getEnabled(), -1);
    }

    @Test
    public void testModifyRole() {
        UserRole userRole = new UserRole(1022, 3);
        userDao.modifyRole(userRole);
        Assert.assertEquals((int) userDao.selectById(1022).getRole().getRid(), 3);
    }
    
    @Test
    public void testSelectAllManagerId() {
        System.out.println(userDao.selectAllManagerId());
    }

    @Test
    public void testSelectAllEmailManagerId() {
        System.out.println(userDao.selectAllEmailManagerId());
    }
    
    @Test
    public void testReceiveEmail() {
        Assert.assertNotNull(userDao.receiveEmail(1022));
    }
}
