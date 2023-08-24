package com.project.commerce.company.dto;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Data
public class SearchCompanyDto {

    private String companyName;
    private Date createdDate;
    private Long countryId;
    private Long userId;
    private String city;

}
