package com.project.ecza.company.service;

import com.project.ecza.company.dto.CompanyDto;
import com.project.ecza.company.dto.SearchCompanyDto;
import com.project.ecza.company.dto.SingleCompanyDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import javax.validation.Valid;
import java.util.List;

public interface CompanyService {
    Boolean save(String authHeader, @Valid CompanyDto dto) throws Exception;
    List<CompanyDto> findBySearching(String authHeader,String companyName) throws Exception;
    Page<SingleCompanyDto> getAllWithPagination(String authHeader, Pageable page, SearchCompanyDto dto) throws Exception;
    CompanyDto findById( Long id) throws Exception;
    Boolean update(String authHeader, Long companyId, @Valid CompanyDto dto) throws Exception;


}
