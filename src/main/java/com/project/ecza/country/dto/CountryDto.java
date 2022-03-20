package com.project.ecza.country.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class CountryDto {

    Long id;
    Long countryId;
    String name;
}
