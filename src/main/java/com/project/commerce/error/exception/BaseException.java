package com.project.commerce.error.exception;

import lombok.Data;

@Data
public class BaseException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    String baseStatus;
    String message;

    public  BaseException(String baseStatus){

        this.baseStatus = baseStatus;
        this.message = null; // doldurulacak json file üzerinden baseStatus e göre
    }
}
