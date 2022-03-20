package com.project.ecza.user.service;


import com.project.ecza.user.dto.UserDto;
import com.project.ecza.user.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    Boolean saveUser(User user);

    User findByUsername(String username);

    List<User> findAllUsers();

    User getYourAccount(String authHeader) throws Exception;

    ResponseEntity<?> update(UserDto dto);

}
