package com.project.commerce.company.entity;

import com.project.commerce.country.entity.Country;
import com.project.commerce.user.entity.User;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import java.util.Date;

@Data
@Getter
@Setter
@Entity
@Table(name="company")
public class Company {

    @Id
    @SequenceGenerator(name = "sq_company", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sq_company")
    @Column(name = "company_id")
    private Long companyId;

    @Column(name = "company_name")
    @NotEmpty
    @NotNull
    private String companyName;

    @Column(name = "tax_no")
    private String taxNo;

    @Column(name = "address")
    private String address;

    @Column(name = "company_phone")
    @NotEmpty
    @NotNull
    private String companyPhone;

    @Column(name = "company_mobile_phone")
    @NotEmpty
    @NotNull
    private String companyMobilePhone;

    @Column(name = "company_fax")
    private String companyFax;

    @Column(name = "city")
    private String city;

    @Column(name = "currency_type")
    private String currencyType;

    @Column(name = "email_address")
    private String emailAddress;


    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "countryid", referencedColumnName = "country_id", nullable = false)
    private Country country;

    @Column(name = "created_date")
    private Date createdDate;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "userid", referencedColumnName = "user_id", nullable = true)
    private User user;


    private int status;

}
