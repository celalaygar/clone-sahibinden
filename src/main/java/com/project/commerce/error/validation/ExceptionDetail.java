package com.project.commerce.error.validation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExceptionDetail {


    private int status;
    private String message;
    private String exceptionDetail;
    private String trace;
    private String error;
    private Date timestamp;
}
