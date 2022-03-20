package com.project.ecza.user.dto;


import com.project.ecza.user.entity.Role;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@Data
public class UserSaveDto {

    private Long userId;

    @NotEmpty
    @NotNull
//    @Size(min=3, max=30)
//    @Pattern(regexp="(([A-Za-zğüşöçıİĞÜŞÖÇ]{3,30})|([A-Za-zğüşöçıİĞÜŞÖÇ]{2}[A-Za-zğüşöçıİĞÜŞÖÇ\\s]{1,}[A-Za-zğüşöçıİĞÜŞÖÇ]{1}))",message = "Lütfen Özel Karakter Girmeyiniz")
    private String name;

    @NotEmpty
    @NotNull
//    @Size(min=3, max=30)
//    @Pattern(regexp="(([A-Za-zğüşöçıİĞÜŞÖÇ]{3,30})|([A-Za-zğüşöçıİĞÜŞÖÇ]{2}[A-Za-zğüşöçıİĞÜŞÖÇ\\s]{1,}[A-Za-zğüşöçıİĞÜŞÖÇ]{1}))",message = "Lütfen Özel Karakter Girmeyiniz")
    private String surname;

    private Date bornDate;

    private Date createdDate;

    @NotEmpty
    @NotNull
    private String username;

    @NotEmpty
    @NotNull
    private String password;

    @NotEmpty
    @NotNull
//    @Pattern(regexp="[A-Za-z]{1}[A-Za-z0-9!#$%&'*+/=?^_`{|}~.,-]{0,20}[A-Za-z0-9]{1}[@][A-Za-z0-9]{1,20}[.][A-Za-z]{1,20}",message = "Lütfen Email Adresini Doğru Girin")
    private String email;

    private String motherName;

    private String fatherName;

    private String tcNo;

    private String bloodType;

    @NotEmpty
    @NotNull
//    @Pattern(regexp="([5]{1}+[1-9]{9})",message = "(5XX)XXXXXXX Şeklinde Giriniz")
    private String phoneNumber;

    private String realPassword;

    private Role role;
}