package com.qa.cv.models;

import org.springframework.data.annotation.Id;

public class Delegate {

	@Id
	public String id;

	public String firstName;
	public String lastName;
	

	public Delegate() {
	}

	public Delegate(String firstName, String lastName) {

		this.firstName = firstName;
		this.lastName = lastName;
	}

	@Override
	public String toString() {
		return "This should be the formatted String for the Delegate Class";
	}

}
