package com.project.commerce.company.dto;

import com.project.commerce.company.entity.Company;
import com.project.commerce.country.entity.Country;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;


@Data
@Getter
@Setter
public class CompanyDto {

    private Long companyId;
    @NotEmpty
    @NotNull
    private String companyName;
    private String taxNo;
    private String address;

//    @Pattern(regexp="[+]([1-9]{1}|[1-9]{1}[0-9]{1}|[1-9]{1}[0-9]{2})[-]{1}[1-9]{1}[0-9]{9}",message = "Lütfen +(Ülke Kodu)-(Telefon Numarası) Şeklinde Girin")
    private String companyPhone;

    @NotEmpty
    @NotNull
//    @Pattern(regexp="[+]([1-9]{1}|[1-9]{1}[0-9]{1}|[1-9]{1}[0-9]{2})[-]{1}[1-9]{1}[0-9]{9}",message = "Lütfen +(Ülke Kodu)-(Telefon Numarası) Şeklinde Girin")
    private String companyMobilePhone;

//    @NotEmpty
//    @NotNull
//    @Pattern(regexp="[+]([1-9]{1}|[1-9]{1}[0-9]{1}|[1-9]{1}[0-9]{2})[-]{1}[1-9]{1}[0-9]{9}",message = "Lütfen +(Ülke Kodu)-(Telefon Numarası) Şeklinde Girin")
    private String companyFax;
    private String city;
    private Long countryId;
    private Country country;
    private Date createdDate;
    private int status;

    private String currencyType;


//    @Pattern(regexp="[A-Za-z]{1}[A-Za-z0-9!#$%&'*+/=?^_`{|}~.,-]{0,20}[A-Za-z0-9]{1}[@][A-Za-z0-9]{1,20}[.][A-Za-z]{1,20}",message = "Lütfen Email Adresini Doğru Girin")
    private String emailAddress;


    public CompanyDto(){
    }
    public CompanyDto(Company company){
        this.companyId = company.getCompanyId();
        this.companyName = company.getCompanyName();
        this.companyFax = company.getCompanyFax();
        this.companyPhone = company.getCompanyPhone();
        this.taxNo = company.getTaxNo();
        this.address = company.getAddress();
        this.city = company.getCity();
        this.countryId = company.getCountry().getCountryId();
        this.country = company.getCountry();
        this.companyMobilePhone = company.getCompanyMobilePhone();
        this.emailAddress = company.getEmailAddress();
        this.currencyType = company.getCurrencyType();
        this.status=company.getStatus();
    }
}
