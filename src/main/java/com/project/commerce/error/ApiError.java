package com.project.commerce.error;

import com.project.commerce.error.exception.HttpErrorType;
import lombok.Data;

import java.util.Date;
import java.util.Map;

@Data
public class ApiError {
	
	private int status;
	
	private String message;
	
	private String path;

	private String error;
	
	private long timestamp = new Date().getTime();

	private Date createdDate = new Date();
	
	private Map<String, String> validationErrors;

	private HttpErrorType httpErrorType;
	public ApiError(int status, String message, String path) {
		this.status = status;
		this.message = message;
		this.path = path;
	}
	public ApiError(int status, String message, String path, String error) {
		this.status = status;
		this.message = message;
		this.path = path;
		this.error = error;
	}
	public ApiError(int status, String message, String path, String error, HttpErrorType httpErrorType) {
		this.status = status;
		this.message = message;
		this.path = path;
		this.error = error;
		this.httpErrorType = httpErrorType;
	}
}
