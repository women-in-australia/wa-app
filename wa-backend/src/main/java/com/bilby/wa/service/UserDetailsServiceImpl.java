package com.bilby.wa.service;

import com.bilby.wa.common.StringUtil;
import com.bilby.wa.dao.UserDao;
import com.bilby.wa.pojo.*;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Resource
    UserDao userDao;
    @Resource
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Resource
    NotificationService notificationService;

    /**
     * get user information by username. In our case, username is the email of user
     * @param s username
     * @return UserDetails
     * @throws UsernameNotFoundException username not found
     */
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userDao.selectUserByUserName(s);
        return new JwtUser(user);
    }

    /**
     * get the username of the current user of the request
     * @return username
     */
    public String getCurrentUserName() {
        return (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    /**
     * get the information of the current user of the request
     * @return User object
     */
    public User getCurrentUser() {
        String username = getCurrentUserName();
        return userDao.selectUserByUserName(username);
    }

    /**
     * Change the role of a user
     * @param uid user id
     * @param rid role id
     * @return response data
     */
    public ResponseInfo modifyRole(Integer uid, Integer rid) {
        userDao.modifyRole(new UserRole(uid, rid));
        return ResponseInfo.buildSuccess();
    }

    /**
     * Update the password of a user
     * @param oldPassword old password
     * @param newPassword new password
     * @return response data
     */
    public ResponseInfo updatePassword(String oldPassword, String newPassword) {
        User user = getCurrentUser();
        if (bCryptPasswordEncoder.matches(oldPassword, user.getPassword())) {
            userDao.updatePassword(user.getEmail(), bCryptPasswordEncoder.encode(newPassword));
            return ResponseInfo.buildSuccess();
        } else {
            return ResponseInfo.buildFailure(1001, "Wrong password");
        }
    }

    /**
     * User registration
     * @param email user email
     * @param password user password
     * @param name user nama
     * @param phone user phone number
     * @param address user address
     * @param motivation user motivation
     * @param experience user experience
     * @param invite user invitation code
     * @return response data
     */
    public ResponseInfo doRegister(String email, String password,
                                   String name, String phone, String address,
                                   String motivation, String experience, String invite) {
        if (userDao.selectUserByUserName(email) != null) {
            return ResponseInfo.buildFailure(1003, "This email has already been registered");
        }
        String from = null;
        Integer role = 1;
        /* Check if user is registering with an invitation code */
        if (!StringUtil.isEmpty(invite)) {
            try {
                Invite i = Invite.fromReferCode(invite);
                if (i.getEmail().equalsIgnoreCase(email)) {
                    from = i.getFrom();
                    role = i.getRole();
                }
            } catch (Exception e) {

            }
        }
        /* instantiate a user object */
        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setPhone(phone);
        user.setAddress(address);
        user.setExperience(experience);
        user.setMotivation(motivation);
        user.setInvited(from);
        user.setPassword(bCryptPasswordEncoder.encode(password));
        userDao.insertUser(user);

        /* save user role */
        UserRole userRole = new UserRole(user.getUid(), role);
        userDao.insertRole(userRole);

        /* send message to managers */
        notificationService.addNewRegistrationMessage(user.getUid(), name, role);
        return ResponseInfo.buildSuccess();
    }

    /**
     * Enable a user
     * @param uid user id
     * @return response data
     */
    public ResponseInfo enableUser(Integer uid) {
        userDao.enableUser(uid);
        notificationService.sendApproveUserEmail(uid);
        return ResponseInfo.buildSuccess();
    }

    /**
     * reject a user
     * @param uid user id
     * @return response data
     */
    public ResponseInfo rejectUser(Integer uid, String feedback) {
        if (!StringUtil.isEmpty(feedback)) {
            notificationService.sendRejectUserEmail(uid, feedback);
        }
        userDao.rejectUser(uid);
        return ResponseInfo.buildSuccess();
    }

    /**
     * get a list of all user
     * @param page page number
     * @param pageSize page size
     * @param review review status
     * @return response data
     */
    public PageResponseInfo allUser(Integer page, Integer pageSize, Integer review) {
        if (page == null) {
            page = 1;
        }
        if (pageSize == null) {
            pageSize = 10;
        }
        PageHelper.startPage(page, pageSize);
        List<User> userList;
        if (review == null) {
            userList = userDao.selectUsersEnabled();
        } else if (review == 1) {
            userList = userDao.selectUsersToReview();
        } else if (review == 2) {
            userList = userDao.selectUsersEnabled();
        } else if (review == 3) {
            userList = userDao.selectUsersRejected();
        } else {
            userList = userDao.selectUsersEnabled();
        }
        PageInfo<User> pageInfo = new PageInfo<>(userList);
        return PageResponseInfo.buildSuccess(page, pageInfo.getPages(),
                pageInfo.isHasNextPage(), pageInfo.isHasPreviousPage(), userList);
    }

    /**
     * get detail information of a user
     * @param uid user id
     * @return response data
     */
    public ResponseInfo getUserDetail(Integer uid) {
        return ResponseInfo.buildSuccess(userDao.selectById(uid));
    }

    /**
     * Invite a user and send the email
     * @param email email address
     * @param role the role that will be assigned to that user
     * @param message invitation message
     * @return response data
     */
    public ResponseInfo inviteUser(String email, Integer role, String message) {
        String from = getCurrentUser().getName();
        Invite invite = new Invite(email, role, from, message);
        String code = invite.toReferCode();
        System.out.println(from);

        String msg = notificationService.generateMessage(from, role, "http://www.womeninau.club/users/create?refer=" + code, message);
        notificationService.sendHtmlMail(email, "Invitation", msg);
        return ResponseInfo.buildSuccess();
    }

    /**
     * get information of current user of the request
     * @return response data
     */
    public ResponseInfo getInfo() {
        User user = getCurrentUser();
        ResponseUser responseUser = new ResponseUser(user.getUid(), user.getEmail(), user.getRole().getRoleName(), user.getName());
        return ResponseInfo.buildSuccess(responseUser);
    }

    public ResponseInfo setReceiveEmail(Boolean receive) {
        if (receive != null) {
            userDao.setReceiveEmail(receive, getCurrentUser().getUid());
        }
        return ResponseInfo.buildSuccess();
    }
}
