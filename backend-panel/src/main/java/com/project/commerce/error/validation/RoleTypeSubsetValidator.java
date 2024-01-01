package com.project.commerce.error.validation;

import com.project.commerce.user.entity.Role;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Arrays;
import java.util.List;

public class RoleTypeSubsetValidator implements ConstraintValidator<RoleTypeSubset, Role> {
    private List<Role> roles;

    @Override
    public void initialize(RoleTypeSubset constraint) {
        this.roles = Arrays.asList(Role.values());
    }

    @Override
    public boolean isValid(Role value, ConstraintValidatorContext context) {
        return value == null || roles.contains(value);
    }
}
