package com.project.commerce.error.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExceptionDetailDto {


    private int status;
    private String message;
    private String exceptionDetail;
    private String trace;
}
