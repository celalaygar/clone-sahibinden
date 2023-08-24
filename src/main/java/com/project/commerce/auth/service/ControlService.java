package com.project.commerce.auth.service;

import com.project.commerce.user.entity.User;
import com.project.commerce.error.ApiError;
import com.project.commerce.webConfig.jwt.JwtTokenProvider;
import com.project.commerce.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ControlService {
	public static final String TOKEN_PREFIX = "Bearer ";
	private final ModelMapper mapper;
	private final Logger logger;
	private final JwtTokenProvider tokenUtil;
	private final UserRepository userRepository;
	
	public ResponseEntity<?> controlUsername(String authHeader,String username) {
		String userNameFromToken = getUsernameFromToken(authHeader);
		if(!userNameFromToken.equals(username)){
			logger.error("User Names cannot match");
			ApiError error = new ApiError(403, "User Names cannot match", "api/user/"+authHeader);
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
		}
		return ResponseEntity.ok(true);
	}
	public User getUser(String username) throws Exception {
		Optional<User> opt = userRepository.findByUsername(username);
		if (!opt.isPresent()) {
			logger.error("There is no user with " + username);
			throw new Exception("There is no user with " + username);
			//throw new IllegalArgumentException("There is no user with " + id);
		}
		return opt.get();
	}
	public User getUserFromToken(String token) throws Exception {
		String username = getUsernameFromToken(token);
		Optional<User> opt = userRepository.findByUsername(username);
		if (!opt.isPresent()) {
			logger.error("There is no user with " + username);
			throw new Exception("There is no user with " + username);
			//throw new IllegalArgumentException("There is no user with " + id);
		}
		return opt.get();
	}
	public String getUsernameFromToken(String authHeader) {
		String username= null;
		if(authHeader != null && authHeader.startsWith(TOKEN_PREFIX)) {
			String token = authHeader.replace(TOKEN_PREFIX, "");
			username = tokenUtil.getUsernameFromToken(token);
		}
		return username;
	}
}
