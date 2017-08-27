package com.sorj.bulletinboard.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Bulletin {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String message;

	private String userID;

	protected Bulletin() {

	}

	public Bulletin(String message) {
		this.message = message;
	}

	public Bulletin(String message, String userID) {
		this.message = message;
		this.userID = userID;
	}

	public Long getId() {
		return id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

}
