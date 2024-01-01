package com.project.commerce.country.repository;

import com.project.commerce.country.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CountryRepository extends JpaRepository<Country, Long> {

	Country findByName(String name);
	List<Country>  findByNameContainingIgnoreCase(String sourceCountryForCalculation);

}
