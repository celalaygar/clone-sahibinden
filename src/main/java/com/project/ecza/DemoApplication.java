package com.project.ecza;

import com.project.ecza.user.entity.Role;
import com.project.ecza.user.entity.User;
import com.project.ecza.country.repository.CountryRepository;
import com.project.ecza.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;

@SpringBootApplication
public class DemoApplication {
	@Autowired
	private CountryRepository countryRepository;
	@Autowired
	private JavaMailSender javaMailSender;

	SimpleMailMessage msg = new SimpleMailMessage();


	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}


	@Bean
	CommandLineRunner createInitialUsers(UserRepository usereRepository,
										 PasswordEncoder passwordEncoder) {
		return (args) -> {
			try {

				User user1 = new User();
				user1.setName("admin");
				user1.setSurname("adminx");
				user1.setUsername("admin");
				user1.setIsLoggedIn(0);
				user1.setStatus(1);
				user1.setPassword(passwordEncoder.encode( "admin123"));
				user1.setFullname(user1.getName()+" "+user1.getSurname());
				user1.setCreatedDate(new Date());
				user1.setRole(Role.ADMIN);
				usereRepository.save(user1);

				User user2 = new User();
				user2.setName("manager");
				user2.setIsLoggedIn(0);
				user2.setSurname("manager");
				user2.setUsername("manager");
				user2.setStatus(1);
				user2.setPassword(passwordEncoder.encode( "manageryusufk"));
				user2.setFullname(user2.getName()+" "+user2.getSurname());
				user2.setCreatedDate(new Date());
				user2.setRole(Role.MANAGER);
				usereRepository.save(user2);

			} catch (Exception e) {
				System.out.println(e);
			}
		};
	}
}
