package com.project.commerce.auth.api;

import com.project.commerce.auth.dto.AuthDto;
import com.project.commerce.auth.service.ControlService;
import com.project.commerce.user.dto.RoleClass;
import com.project.commerce.user.entity.Role;
import com.project.commerce.user.entity.User;
import com.project.commerce.user.repository.UserRepository;
import com.project.commerce.user.service.UserServiceImpl;
import com.project.commerce.webConfig.jwt.JwtResponse;
import com.project.commerce.webConfig.jwt.JwtTokenProvider;
import io.jsonwebtoken.impl.DefaultClaims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class LoginApi {
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserRepository userRepository;
	@Autowired
		private ControlService controlService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private UserRepository repository;


    // login olmak için kullanılan linktir
	// username: -----
	// password: -----
	// parametreleri almaktadır.
	@PostMapping("/api/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthDto authenticationRequest) throws Exception {
		try {
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));

			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = jwtTokenProvider.generateToken(authentication);
			String username = authenticationRequest.getUsername();
			Optional<User> opt = repository.findByUsername(username);

			if(!opt.isPresent()){
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNAUTHORIZED");
			}
			User user = opt.get();

			//  üye giriş yaparken login aktifliğinin 1 olup olmadığını kontrol eder
//			if(user.getIsLoggedIn() == 1)
//				return ResponseEntity.status(HttpStatus.CONFLICT).body("CONFLICT");

			//  üye giriş yaparken login aktifliğini 1 e çeker
			user.setIsLoggedIn(1);
			user = userRepository.save(user);
			return ResponseEntity.ok(new JwtResponse(user.getUserId(), username,jwt,null,user.getRole()));
		}catch (BadCredentialsException e) {
			//ApiError error = new ApiError(401, "Unauthorized request : "+e.getMessage(), "/api/login");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNAUTHORIZED");
		}
		catch (Exception e) {
			throw e;
		}
	
	}
	@GetMapping("/api/roles")
	public ResponseEntity<List<RoleClass>> getAllBookStatus() {
		List<Role> roles= Arrays.asList(Role.values());
		ArrayList<RoleClass> roleClasses= new ArrayList<>();
		roles.forEach(role->{
			RoleClass roleClass = new RoleClass(role, role.getValue());
			roleClasses.add(roleClass);
		});
		return ResponseEntity.ok(roleClasses);
	}



//	@PostMapping("/refresh-token")
//	public ResponseEntity<?> refreshToken(@RequestBody TokenDto dto) throws Exception {
//		System.out.println(dto.getToken() );
//		try {
//			if(dto.getToken() != null ) {
//				String token = dto.getToken().replace(TOKEN_PREFIX, "");
//				Boolean controlTokenExpired  =  jwtTokenProvider.isTokenExpired(token);
//				return ResponseEntity.ok(controlTokenExpired);
//			}
//			return ResponseEntity.ok(true);
//		}catch (BadCredentialsException e) {
//			//ApiError error = new ApiError(401, "Unauthorized request : "+e.getMessage(), "/api/login");
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("bad Request");
//		}
//		catch (Exception e) {
//			throw e;
//		}
//	}





	// WebSecurityConfig linkinde permit all edilmiş bir linktir.
	// jwt tokenı yenilemek için kullanılacaktır.
	@GetMapping("/refresh-token")
	public ResponseEntity<?> refreshtoken(HttpServletRequest request) throws Exception {
		// From the HttpRequest get the claims
		DefaultClaims claims = (DefaultClaims) request.getAttribute("claims");

		Map<String, Object> expectedMap = getMapFromIoJsonwebtokenClaims(claims);
		String token = jwtTokenProvider.doGenerateRefreshToken(expectedMap, expectedMap.get("sub").toString());
		return ResponseEntity.ok(token);
	}

	public Map<String, Object> getMapFromIoJsonwebtokenClaims(DefaultClaims claims) {
		Map<String, Object> expectedMap = new HashMap<String, Object>();
		for (Map.Entry<String, Object> entry : claims.entrySet()) {
			expectedMap.put(entry.getKey(), entry.getValue());
		}
		return expectedMap;
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
