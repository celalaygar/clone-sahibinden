package com.project.ecza.user.api;

import com.project.ecza.user.dto.UserSaveDto;
import com.project.ecza.webConfig.jwt.JwtTokenProvider;
import com.project.ecza.user.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@CrossOrigin
public class RegisterApi {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/api/registration")
    public ResponseEntity<?> register(@Valid @RequestBody UserSaveDto dto){
        if(userService.findByUsername(dto.getUsername()) != null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return ResponseEntity.ok(userService.saveUser(dto));
    }


}
