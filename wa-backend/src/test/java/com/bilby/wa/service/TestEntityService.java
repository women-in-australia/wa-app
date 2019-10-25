package com.bilby.wa.service;

import com.bilby.wa.pojo.PageResponseInfo;
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
public class TestEntityService {
    @Resource
    EntityService entityService;

    @Test
    public void testAllEntity() {
        PageResponseInfo responseInfo = entityService.allEntity(1, 10, null);
        Assert.assertEquals((int) responseInfo.getCode(), 200);
    }

    @Test
    public void testToDoEntity() {
        PageResponseInfo responseInfo = entityService.todoEntity(1, 10, null);
        Assert.assertEquals((int) responseInfo.getCode(), 200);
    }

    @Test
    public void testRelatedEntityPrompt() {
        ResponseInfo responseInfo = entityService.relatedEntityPrompt("A", 1);
        Assert.assertEquals((int) responseInfo.getCode(), 200);
    }

    @Test
    public void testCheckRelatedEntity() {
        ResponseInfo responseInfo = entityService.checkRelatedEntity("Demo");
        Assert.assertEquals((int) responseInfo.getCode(), 200);
    }

    @Test
    public void testOccupationPrompt() {
        ResponseInfo responseInfo = entityService.occupationPrompt("A");
        Assert.assertEquals((int) responseInfo.getCode(), 200);
    }

    @Test
    public void testCheckOccupation() {
        ResponseInfo responseInfo = entityService.checkOccupation("Scholar");
        Assert.assertEquals((int) responseInfo.getCode(), 200);
    }
}
