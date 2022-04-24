package com.project.ecza.company.exception;

import lombok.Data;

@Data
public class BaseException extends Exception {
    private static final long serialVersionUID = 1L;
    String baseStatus;


    public  BaseException(String baseStatus){
        this.baseStatus = baseStatus;
    }
}
