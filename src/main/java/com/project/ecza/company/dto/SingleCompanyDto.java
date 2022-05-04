package com.project.ecza.company.dto;

import com.project.ecza.company.entity.Company;
import com.project.ecza.country.dto.CountryDto;
import com.project.ecza.user.entity.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Getter
@Setter
public class SingleCompanyDto {
    private Long companyId;

    private String companyName;

    private String taxNo;

    private String address;

    private String companyPhone;

    private String companyMobilePhone;

    private String companyFax;

    private String city;

    private Date createdDate;

    private CountryDto country;
    private String emailAddress;
    private User user;
    private int status;

    public SingleCompanyDto(Company company) {
        this.companyId = company.getCompanyId();
        this.companyName = company.getCompanyName();
        this.taxNo = company.getTaxNo();
        this.address = company.getAddress();
        this.companyPhone = company.getCompanyPhone();
        this.companyMobilePhone = company.getCompanyMobilePhone();
        this.companyFax = company.getCompanyFax();
        this.city = company.getCity();
        this.createdDate = company.getCreatedDate();
        this.country = new CountryDto(company.getCountry().getCountryId(),company.getCountry().getCountryId(),company.getCountry().getName());
        this.emailAddress = company.getEmailAddress();
        this.user = company.getUser();
        this.status = company.getStatus();
    }
}
