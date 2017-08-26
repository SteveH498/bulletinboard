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

	private String user;

	protected Bulletin() {

	}

	public Bulletin(String message) {
		this.message = message;
	}

	public Bulletin(String message, String user) {
		this.message = message;
		this.user = user;
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

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

}
