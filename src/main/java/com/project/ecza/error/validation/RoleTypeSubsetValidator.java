package com.project.ecza.error.validation;

import com.project.ecza.user.entity.Role;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
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
