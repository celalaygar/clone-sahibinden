package com.project.commerce.error.exception;

import com.project.commerce.error.model.BaseStatusEnum;
import lombok.Data;

@Data
public class BaseException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    BaseStatusEnum baseStatus;
    String message;

    public  BaseException(BaseStatusEnum baseStatus){

        this.baseStatus = baseStatus;
        this.message = null; // doldurulacak json file üzerinden baseStatus e göre
    }
}
