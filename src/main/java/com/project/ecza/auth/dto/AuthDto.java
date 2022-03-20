package com.project.ecza.auth.dto;

import lombok.*;

@Getter
@Setter
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AuthDto {
	
	private String username;
	private String password;

}
