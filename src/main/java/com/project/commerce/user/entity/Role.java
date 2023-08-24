package com.project.commerce.user.entity;

public enum Role {
    ADMIN("ADMIN"),
    EXPORTER("İHRACATÇI"),
    MANAGER("MÜDÜR"),
    PHARMACY("ECZACI"),
    PURCHASE("SATIN ALMA"),
    WAREHOUSEMAN ("DEPOCU"),
    ACCOUNTING ("MUHASEBECİ"),
    LOGISTIC ("LOJİSTİKÇİ");


    private String value;
    public String getValue() {
        return this.value;
    }
    Role(String value) {
        this.value = value;
    }

}
