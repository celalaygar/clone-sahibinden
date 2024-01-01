package com.project.commerce.error.model;

public enum BaseStatusEnum {

    UNAUTHORIZED("UNAUTHORIZED"),
    BAD_CREDENTIAL("BAD CREDENTIAL"),
    INTERNAL_SERVER_ERROR("INTERNAL SERVER ERROR");


    private String value;
    public String getValue() {
        return this.value;
    }
    BaseStatusEnum(String value) {
        this.value = value;
    }
}
