package com.project.commerce.country.service;

import com.project.commerce.country.entity.Country;
import com.project.commerce.country.repository.CountryRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CountryService {
    @Autowired
    private CountryRepository countryRepository;
    
    public List<Country> getAll(){
    	return countryRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }
    
    public Boolean save(@Valid Country country) {
    	country = countryRepository.save(country);
    	if(country.getCountryId() == null || country.getCountryId()<1)
    		return false;
    	return true;
    }
    
    public Boolean update(Long id, @Valid Country country) {
    	Optional<Country> opt= countryRepository.findById(id);
    	if(!opt.isPresent())
    		return false;
    	country.setCountryId(id);
    	country = countryRepository.save(country);

    	return true;
    }
    
    public Boolean delete(Long id) {
    	Optional<Country> opt= countryRepository.findById(id);
    	if(!opt.isPresent())
    		return false;
    	countryRepository.delete(opt.get());
    	return true;
    }
}
