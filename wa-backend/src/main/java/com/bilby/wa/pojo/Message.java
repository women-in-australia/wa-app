package com.bilby.wa.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
/**
 * table name:  message
 * author name: joseph
 * create time: 2019/10/06 16:43:12
 */ 
public class Message{

	@JsonIgnore
	private Integer mid;
	@JsonIgnore
	private Integer uid;
	private Integer type;
	private String content;
	private String link;
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") //set
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+11") //get
	private Date time;
	private Boolean unread;

	public Integer getMid() {
		return mid;
	}

	public void setMid(Integer mid) {
		this.mid = mid;
	}

	public Integer getUid() {
		return uid;
	}

	public void setUid(Integer uid) {
		this.uid = uid;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public Boolean getUnread() {
		return unread;
	}

	public void setUnread(Boolean unread) {
		this.unread = unread;
	}
}

