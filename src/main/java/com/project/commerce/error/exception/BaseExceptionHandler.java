package com.project.commerce.error.exception;


import com.project.commerce.error.exception.dto.ApiErrorDto;
import com.project.commerce.error.exception.dto.ExceptionDetailDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@ControllerAdvice
public class BaseExceptionHandler implements ErrorController {

    @Autowired
    private ErrorAttributes errorAttributes;

    @ExceptionHandler(value = BaseException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ApiErrorDto> exception(BaseException exception) {
        ApiErrorDto apiError = new ApiErrorDto(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                exception.getBaseStatus(),
                "path", "error",
                HttpErrorType.SPECIFIC);
        return new ResponseEntity<>(apiError,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @RequestMapping("/error")
    ApiErrorDto handleError(WebRequest webRequest) {
        ErrorAttributeOptions options = ErrorAttributeOptions
                .defaults()
                .including(ErrorAttributeOptions.Include.values());
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
        ExceptionDetailDto detail = new ExceptionDetailDto(status,message, exception, null, error, timestamp);
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
