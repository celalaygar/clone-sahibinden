package com.project.commerce.error.model;

public enum BaseStatusEnum {

    UNAUTHORIZED("1000"),
    BAD_CREDENTIAL("1001");


    private String value;
    public String getValue() {
        return this.value;
    }
    BaseStatusEnum(String value) {
        this.value = value;
    }
}
