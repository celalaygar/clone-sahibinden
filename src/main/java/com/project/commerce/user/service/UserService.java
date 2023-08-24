package com.project.commerce.user.service;


import com.project.commerce.user.dto.UserDto;
import com.project.commerce.user.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    Boolean saveUser(User user);

    User findByUsername(String username);

    List<User> findAllUsers();

    User getYourAccount(String authHeader) throws Exception;

    ResponseEntity<?> update(UserDto dto);

}
