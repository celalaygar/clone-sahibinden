package com.project.commerce.user.dto;

import lombok.Data;

@Data
public class UserPasswordUpdateDto {
    private String oldPassword;
    private String newPassword;
    private String repeatNewPassword;
}
