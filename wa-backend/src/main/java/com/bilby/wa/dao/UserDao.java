package com.bilby.wa.dao;

import com.bilby.wa.pojo.User;
import com.bilby.wa.pojo.UserRole;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Data access object for users
 * Mapper location: resources/mappers/UserMapper.xml
 */
@Mapper
public interface UserDao {
    List<User> selectAllUsers();

    List<User> selectUsersToReview();

    List<User> selectUsersEnabled();

    List<User> selectUsersRejected();

    User selectUserByUserName(String username);

    User selectById(Integer uid);

    void insertUser(User user);

    void insertRole(UserRole userRole);

    User selectByEmail(String email);

    void enableUser(Integer uid);

    void rejectUser(Integer uid);

    void updatePassword(@Param("email") String email, @Param("password") String password);

    void modifyRole(UserRole userRole);

    User selectContributorByEntity(Integer eid);

    List<Integer> selectAllManagerId();

    List<Integer> selectAllEmailManagerId();

    List<Integer> selectAllCuratorId();

    Boolean receiveEmail(Integer uid);

    void setReceiveEmail(@Param("receive") boolean receive,
                         @Param("uid") Integer uid);
}
