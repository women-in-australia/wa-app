package com.bilby.wa.service;

import com.bilby.wa.common.Constant;
import com.bilby.wa.common.StringUtil;
import com.bilby.wa.dao.EntityDao;
import com.bilby.wa.dao.MessageDao;
import com.bilby.wa.dao.UserDao;
import com.bilby.wa.pojo.EntityListItem;
import com.bilby.wa.pojo.Message;
import com.bilby.wa.pojo.PageResponseInfo;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.List;

/**
 * @author Yangzhe Xie
 * @date 2019-09-07
 */
@Service
public class NotificationService {

    @Value("${spring.mail.username}")
    private String from;

    @Resource
    private JavaMailSender mailSender;
    @Resource
    MessageDao messageDao;
    @Resource
    UserDetailsServiceImpl userDetailsService;
    @Resource
    UserDao userDao;
    @Resource
    EntityDao entityDao;

    /**
     * send simple email
     * @param to email receiver
     * @param subject email subject
     * @param content email content
     */
    public void sendSimpleMail(String to, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        message.setFrom(from);
        mailSender.send(message);
    }

    /**
     * send html email
     * @param to email receiver
     * @param subject email subject
     * @param content email content
     */
    public void sendHtmlMail(String to, String subject, String content) {

        new Thread(() -> {
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper;
            try {
                helper = new MimeMessageHelper(message, true);
                helper.setFrom(from);
                helper.setTo(to);
                helper.setSubject(subject);
                helper.setText(content, true);
                mailSender.send(message);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }).start();
    }

    public String generateMessage(String from, int role, String link, String message) {
        String roleName = "contributor";
        switch (role) {
            case 1:
                roleName = "contributor";
                break;
            case 2:
                roleName = "curator";
                break;
            case 3:
                roleName = "manager";
                break;
        }
        String s = "<p>Hi there,</p>";
        s += "<p>This is Australian Women's Archives Project. " + from +
                " invites you to be a " + roleName + " of our project.</p>" +
                (StringUtil.isEmpty(message) ? "" : "<p>" + message + "</p>") +
                "<p>Click the <a href=\"" + link + "\">link</a> to sign up.</p>";
        return s;
    }

    public void sendRejectUserEmail(Integer uid, String feedback) {
        String s = "<p>Hi there,</p>";
        s += "<p>This is Australian Women's Archives Project. " +
                "Thank you very much for being interested in our project . Your registration if rejected, here is your feedback: </p>" +
                "<p>" + feedback + "</p>";
        String email = userDao.selectById(uid).getEmail();
        sendHtmlMail(email, "Notification", s);
    }

    public void sendApproveUserEmail(Integer uid) {
        String s = "<p>Hi there,</p>";
        s += "<p>This is Australian Women's Archives Project. " +
                "Thank you very much for being interested in our project . Your account is now activated.</p>";
        String email = userDao.selectById(uid).getEmail();
        sendHtmlMail(email, "Notification", s);
    }

    public void sendNotificationEmail(Integer uid, Message message) {
        String email = userDao.selectById(uid).getEmail();
        String s = "<p>Hi there,</p>";
        s += "<p>This is Australian Women's Archives Project. " +
               message.getContent() + "</p>" +
                "<p>Click the <a href=\"" + message.getLink() + "\">link</a> to see the details.</p>";
        sendHtmlMail(email, "Notification", s);
    }

    /**
     * Get a list of all message for the current user
     * @param page page number
     * @param pageSize page size
     * @return response data
     */
    public PageResponseInfo getMessageList(Integer page, Integer pageSize) {
        if (page == null) {
            page = 1;
        }
        if (pageSize == null) {
            pageSize = 10;
        }
        Integer uid = userDetailsService.getCurrentUser().getUid();
        PageHelper.startPage(page, pageSize);
        List<Message> messageList = messageDao.selectAllMessageById(uid);
        PageInfo<Message> pageInfo = new PageInfo<>(messageList);
        PageResponseInfo res = PageResponseInfo.buildSuccess(page, pageInfo.getPages(),
                pageInfo.isHasNextPage(), pageInfo.isHasPreviousPage(), messageList);
        res.setReceive(userDao.receiveEmail(uid));
        return res;
    }

    /**
     * Insert a message for a review of an entity
     * @param uid contributor id
     * @param eid entity id
     * @param entityName entity name
     */
    public void addNewReviewMessage(Integer uid, Integer eid, String entityName) {
        Message message = new Message();
        message.setType(1);
        message.setUid(uid);
        message.setContent("You have a new feedback on your contribution - " + entityName + ".");
        if (entityDao.selectEntityDetail(eid).getType() == 1) {
            message.setLink(Constant.BASE_URL + "/entities/reject/person/" + eid);
        } else {
            message.setLink(Constant.BASE_URL + "/entities/reject/organisation/" + eid);
        }
        messageDao.insertMessage(message);
        if (userDao.receiveEmail(uid)) {
            //TODO: send email
            sendNotificationEmail(uid, message);
        }
    }

    public void addEntityApprovedMessage(Integer uid, Integer eid, String entityName) {
        Message message = new Message();
        message.setType(1);
        message.setUid(uid);
        message.setContent("Your contribution has been approved - " + entityName + ".");
        message.setLink(Constant.BASE_URL + "/entities/" + eid);
        messageDao.insertMessage(message);
        if (userDao.receiveEmail(uid)) {
            //TODO: send email
            sendNotificationEmail(uid, message);
        }
    }

    /**
     * Insert a message for a new registration
     * @param uid receiver id
     * @param username new user's username
     * @param role new user's role
     */
    public void addNewRegistrationMessage(Integer uid, String username, Integer role) {
        Message message = new Message();
        message.setType(2);
        if (role == 1) {
            message.setContent(username + " is applying a account as a contributor");
        } else if (role == 2) {
            message.setContent(username + " is applying a account as a curator");
        } else {
            message.setContent(username + " is applying a account as a manager");
        }
        message.setLink(Constant.BASE_URL + "/applications/" + uid);
        for (Integer managerId: userDao.selectAllManagerId()) {
            message.setUid(managerId);
            messageDao.insertMessage(message);
        }

        for (Integer managerId: userDao.selectAllEmailManagerId()) {
            //TODO: send email
            sendNotificationEmail(managerId, message);
        }

    }

    /**
     * Insert a message for a new entity
     * @param username creator's username
     * @param entityName name of the entity
     * @param eid id of the entity
     */
    public void addNewEntityMessage(String username, String entityName, Integer eid) {
        Message message = new Message();
        message.setType(3);

        if (entityDao.selectEntityDetail(eid).getType() == 1) {
            message.setLink(Constant.BASE_URL + "/entities/check/person/" + eid);
        } else {
            message.setLink(Constant.BASE_URL + "/entities/check/organisation/" + eid);
        }

        message.setContent(username + " created a new entity - " + entityName);
        for (Integer managerId: userDao.selectAllManagerId()) {
            message.setUid(managerId);
            messageDao.insertMessage(message);
        }
        for (Integer curatorId: userDao.selectAllCuratorId()) {
            message.setUid(curatorId);
            messageDao.insertMessage(message);
        }
        for (Integer managerId: userDao.selectAllEmailManagerId()) {
            //TODO: send email
            sendNotificationEmail(managerId, message);
        }
    }
}
