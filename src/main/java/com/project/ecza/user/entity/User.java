package com.project.ecza.user.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

@Data
@Getter
@Setter
@Entity
@Table(name="users")
public class User implements Serializable {

    @Id
    @SequenceGenerator(name = "sq_users", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sq_users")
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "name")
    @NotEmpty
    @NotNull
    private String name;

    @Column(name = "surname")
    @NotEmpty
    @NotNull
    private String surname;


    @Column(name = "fullname")
    @NotEmpty
    @NotNull
    private String fullname;
    
	@Column(name = "bornDate")
	private Date bornDate;
	
	@Column(name = "createdDate")
	private Date createdDate;
    
    @Column(name="username", unique = true)
    @NotEmpty
    @NotNull
    private String username;

    @Column(name="password")
    @NotEmpty
    @NotNull
    private String password;
    
    @Column(name="email")
    @NotEmpty
    @NotNull
    private String email;

    @Column(name="mother_name")
    private String motherName;

    @Column(name="father_name")
    private String fatherName;

    @Column(name="tc_no")
    private String tcNo;

    @Column(name="blood_type")
    private String bloodType;

    @Column(name="phone_number")
    private String phoneNumber;


    @Enumerated(EnumType.STRING)
    @Column(name="role", nullable = false)
    @NotEmpty
    @NotNull
    private Role role;

    private int isLoggedIn;
    @Column(name="status")
    private int status;

    @Transient
    private String token;
}
