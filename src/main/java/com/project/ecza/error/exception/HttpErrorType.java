package com.project.ecza.error.exception;

public enum HttpErrorType {
    VALIDATION("VALIDATION"),
    STANDART("STANDART"),
    SPECIFIC("SPECIFIC"),
    UNIQUE("UNIQUE");

    private String value;
    public String getValue() {
        return this.value;
    }
    HttpErrorType(String value) {
        this.value = value;
    }
}
