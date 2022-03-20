package com.project.ecza.user.dto;

import com.project.ecza.user.entity.Role;
import com.project.ecza.user.entity.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@Data
public class UserDto {
    private Long userId;
    private String name;
    private String surname;
	private Date bornDate;
	private Date createdDate;
    private String username;
    private String email;
    private Role role;
    private String tcNo;
    private String motherName;
    private String fatherName;
    private String password;
    private String bloodType;
    private String phoneNumber;

    private int isLoggedIn;
    private int status;

    public UserDto(){

    }
    public UserDto(User user){
        this.userId = user.getUserId();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.bornDate = user.getBornDate();
        this.createdDate = user.getBornDate();
        this.username = user.getUsername();
        this.role = user.getRole();
        this.tcNo = user.getTcNo();
        this.motherName = user.getMotherName();
        this.fatherName = user.getFatherName();
        this.email = user.getEmail();
        this.bloodType = user.getBloodType();
        this.phoneNumber = user.getPhoneNumber();
        this.isLoggedIn = user.getIsLoggedIn();
        this.status = user.getStatus();
    }
}
