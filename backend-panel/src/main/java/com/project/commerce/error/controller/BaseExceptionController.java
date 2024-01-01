package com.project.commerce.error.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.commerce.error.exception.BaseException;
import com.project.commerce.error.exception.HttpErrorType;
import com.project.commerce.error.dto.ApiErrorDto;
import com.project.commerce.error.dto.ExceptionDetailDto;
import com.project.commerce.error.model.BaseExceptionStatus;
import com.project.commerce.error.model.BaseStatusEnum;
import com.project.commerce.error.service.JsonFileConverterService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@ControllerAdvice
public class BaseExceptionController implements ErrorController {

    @Autowired
    private ErrorAttributes errorAttributes;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private JsonFileConverterService converter;

    @ExceptionHandler(value = BaseException.class)
    //@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ApiErrorDto> exception(BaseException exception, HttpServletRequest request) throws IOException {
        BaseExceptionStatus json = converter.getBaseExceptionStatus();

        if(exception.getBaseStatus() == BaseStatusEnum.UNAUTHORIZED){
            ApiErrorDto apiError = new ApiErrorDto(
                    HttpStatus.UNAUTHORIZED.value(),
                    exception.getBaseStatus().getValue(),
                    "path",
                    BaseStatusEnum.UNAUTHORIZED.toString(),
                    HttpErrorType.STANDART);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
        } else if(exception.getBaseStatus() == BaseStatusEnum.BAD_CREDENTIAL){
            ApiErrorDto apiError = new ApiErrorDto(
                    HttpStatus.UNAUTHORIZED.value(),
                    exception.getBaseStatus().getValue(),
                    "path",
                    BaseStatusEnum.UNAUTHORIZED.toString(),
                    HttpErrorType.STANDART);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
        } else {
            ApiErrorDto apiError = new ApiErrorDto(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    exception.getBaseStatus().getValue(),
                    "path",
                    "error",
                    HttpErrorType.SPECIFIC);
            return new ResponseEntity<>(apiError,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }



    @RequestMapping("/error")
    ApiErrorDto handleError(WebRequest webRequest) {
        ErrorAttributeOptions options = ErrorAttributeOptions.defaults().including(ErrorAttributeOptions.Include.values());
        Map<String, Object> attributes = this.errorAttributes.getErrorAttributes(webRequest, options);
        String message	= (String) attributes.get("message");
        String path 	= (String) attributes.get("path");
        String error 	= (String) attributes.get("error");
        int status		= (Integer) attributes.get("status");
        Date timestamp 	= (Date) attributes.get("timestamp");
        String exception 	= (String) attributes.get("exception");
        //String trace 	= (String) attributes.get("trace");
        ApiErrorDto apiError = new ApiErrorDto(status, message, path, error);
        apiError.setHttpErrorType(HttpErrorType.STANDART);
        apiError.setCreatedDate(timestamp);
        //ExceptionDetailDto detail = new ExceptionDetailDto(status,message, exception, null, error, timestamp);
        ExceptionDetailDto detail = new ExceptionDetailDto(status, message, exception, null);
        apiError.setDetail(detail);
        if(attributes.containsKey("errors")) {
            @SuppressWarnings("unchecked")
            List<FieldError> fieldErrors = (List<FieldError>)attributes.get("errors");
            Map<String, String> validationErrors = new HashMap<>();
            if (fieldErrors.size()>0){
                apiError.setHttpErrorType(HttpErrorType.VALIDATION);
            }
            for(FieldError fieldError: fieldErrors) {
                validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            apiError.setValidationErrors(validationErrors);
        }
        return apiError;
    }

}
