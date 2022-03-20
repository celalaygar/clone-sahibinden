package com.project.ecza.webConfig.jwt;

import com.project.ecza.user.entity.Role;
import lombok.*;

import java.io.Serializable;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse  implements Serializable{
	private Long userId;
	private String username;
	private String jwttoken;
	private String email;
	private Role role;
}
