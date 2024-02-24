package com.project.commerce;

import com.project.commerce.country.repository.CountryRepository;
import com.project.commerce.user.entity.Role;
import com.project.commerce.user.entity.User;
import com.project.commerce.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.DataSourceInitializer;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;
import java.util.Date;

@SpringBootApplication
public class CommerceApplication {

	public static void main(String[] args) { SpringApplication.run(CommerceApplication.class, args); }

	@Bean
	CommandLineRunner createInitialUsers(UserRepository usereRepository,
										 PasswordEncoder passwordEncoder) {
		return (args) -> {
			try {

				User user1 = new User();
				user1.setName("admin");
				user1.setSurname("adminx extra");
				user1.setUsername("admin");
				user1.setIsLoggedIn(0);
				user1.setTcNo("33322211155");
				user1.setFatherName("user1 felan");
				user1.setPhoneNumber("+95554447896");
				user1.setStatus(1);
				user1.setPassword(passwordEncoder.encode( "admin123"));
				user1.setFullname(user1.getName()+" "+user1.getSurname());
				user1.setCreatedDate(new Date());
				user1.setBornDate(new Date());
				user1.setRole(Role.ADMIN);
				usereRepository.save(user1);

				User user2 = new User();
				user2.setName("manager");
				user2.setIsLoggedIn(0);
				user2.setSurname("manager serr");
				user2.setUsername("manager");
				user2.setTcNo("55511142155");
				user2.setFatherName("user2 fatt");
				user1.setPhoneNumber("+95554441111");
				user2.setStatus(1);
				user2.setPassword(passwordEncoder.encode( "manageryusufk"));
				user2.setFullname(user2.getName()+" "+user2.getSurname());
				user2.setBornDate(new Date());
				user2.setCreatedDate(new Date());
				user2.setRole(Role.MANAGER);
				usereRepository.save(user2);

			} catch (Exception e) {
				System.out.println(e);
			}
		};
	}

	@Bean
	public DataSourceInitializer dataSourceInitializer(@Qualifier("dataSource") final DataSource dataSource) {
		ResourceDatabasePopulator resourceDatabasePopulator = new ResourceDatabasePopulator();
		resourceDatabasePopulator.addScript(new ClassPathResource("/scripts/myscript_v1.sql"));
		DataSourceInitializer dataSourceInitializer = new DataSourceInitializer();
		dataSourceInitializer.setDataSource(dataSource);
		dataSourceInitializer.setDatabasePopulator(resourceDatabasePopulator);
		return dataSourceInitializer;
	}
}
