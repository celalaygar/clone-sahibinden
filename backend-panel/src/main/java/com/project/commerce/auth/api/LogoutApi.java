package com.project.commerce.auth.api;
import com.project.commerce.user.entity.User;
import com.project.commerce.user.repository.UserRepository;
import com.project.commerce.auth.service.ControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/logout")
public class LogoutApi {

    @Autowired
    private ControlService controlService;
    @Autowired
    private UserRepository userRepository;


    // üye cıkıs yaparken login aktifliğini 0 a çeker
    @GetMapping("/user")
    public ResponseEntity<Boolean> logOut( @RequestHeader("Authorization") String authHeader ) throws Exception {
        User user = this.getUserFromToken(authHeader);
        user.setIsLoggedIn(0);
        user = userRepository.save(user);
        return ResponseEntity.ok(true);
    }

    // bu lınke uye gırısı yapmadan ulaşılabılıyor.
    // uye gırısı yapmıs  bır user ın tokenı öldüğü zaman kullanılıyor.
    @GetMapping("/default/{username}")
    public ResponseEntity<Boolean> defaultLogOut( @RequestHeader("Authorization") String authHeader,
                                                  @PathVariable String username) throws Exception {
        Optional<User> opt = userRepository.findByUsername(username);
        User user = opt.get();
        user.setIsLoggedIn(0);
        user = userRepository.save(user);
        return ResponseEntity.ok(true);
    }

    private User getUserFromToken(String authHeader) throws Exception {

        String username = controlService.getUsernameFromToken(authHeader);
        Optional<User> optUser = userRepository.findByUsername(username);
        if(!optUser.isPresent()) {
            throw new Exception("Not found User");
        }
        return optUser.get();
    }
}
