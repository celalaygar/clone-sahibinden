package com.project.ecza.user.dto;


import com.project.ecza.user.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RoleClass {
    Role role;
    String value;


}
