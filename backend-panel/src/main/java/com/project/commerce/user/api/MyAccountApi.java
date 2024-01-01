package com.project.commerce.user.api;


import com.project.commerce.user.dto.UserDto;
import com.project.commerce.user.dto.UserPasswordUpdateDto;
import com.project.commerce.user.service.UserServiceImpl;
import com.project.commerce.util.ApiPath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping(ApiPath.MyAccountCtrl.CTRL)
public class MyAccountApi {

    @Autowired
    private UserServiceImpl userService;

    @GetMapping
    public ResponseEntity<UserDto> getYourAccount(@RequestHeader("Authorization") String authHeader) throws Exception {
        return ResponseEntity.ok(userService.getYourAccount(authHeader));
    }
    @PostMapping("/update-my-password")
    public ResponseEntity<?> getYourAccount(@RequestHeader("Authorization") String authHeader, @RequestBody UserPasswordUpdateDto dto) throws Exception {
        return ResponseEntity.ok(userService.updateMyPassword(authHeader,dto));
    }
    @PutMapping("/username/{username}")
    public ResponseEntity<Boolean> updateYourSelf(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody UserDto userDto) throws Exception {
        return ResponseEntity.ok(userService.updateYourSelf(authHeader, userDto));
    }

}
