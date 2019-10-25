package com.bilby.wa.dao;

import com.bilby.wa.pojo.Message;
import com.bilby.wa.pojo.User;
import com.bilby.wa.pojo.UserRole;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Data access object for messages
 * Mapper location: resources/mappers/MessageMapper.xml
 */
@Mapper
public interface MessageDao {
    List<Message> selectAllMessageById(Integer uid);

    void insertMessage(Message message);
}
