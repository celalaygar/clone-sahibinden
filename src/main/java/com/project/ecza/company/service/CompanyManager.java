package com.project.ecza.company.service;

import com.project.ecza.company.dto.CompanyDto;
import com.project.ecza.company.entity.Company;
import com.project.ecza.country.entity.Country;
import com.project.ecza.user.entity.Role;
import com.project.ecza.user.entity.User;
import com.project.ecza.company.repository.CompanyRepository;
import com.project.ecza.company.dto.SearchCompanyDto;
import com.project.ecza.company.dto.SingleCompanyDto;
import com.project.ecza.country.repository.CountryRepository;
import com.project.ecza.user.repository.UserRepository;
import com.project.ecza.auth.service.ControlService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.validation.Valid;
import java.math.BigInteger;
import java.util.*;

@Slf4j
@Service
public class CompanyManager implements CompanyService {

    @Autowired
    private EntityManager entityManager;
    @Autowired
    private ControlService controlService;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private CountryRepository countryRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Boolean save(String authHeader, @Valid CompanyDto dto) throws Exception {
        User user = controlService.getUserFromToken(authHeader);
        try {
            Optional<Country> optCountry = countryRepository.findById(dto.getCountryId());
            if (!optCountry.isPresent()) {
                log.info("Seçili Ülke Kaydı Bulunamadı..");
                throw new Exception("Seçili Ülke Kaydı Bulunamadı..");
            }
            Company company = mapper.map(dto, Company.class);

            //company.setUser(optUser.get());
            Country country = optCountry.get();
            company.setStatus(1);
            company.setUser(user);
            company.setCity(dto.getCity());
            company.setCompanyPhone(dto.getCompanyPhone());
            company.setCompanyMobilePhone(dto.getCompanyMobilePhone());
            company.setEmailAddress(dto.getEmailAddress());
            company.setCreatedDate(new Date());
            company.setCountry(country);
            company = companyRepository.save(company);


            return true;
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<CompanyDto> findBySearching(String authHeader, String companyName) throws Exception {

        List<CompanyDto> dtoList = new ArrayList<>();
        User user = controlService.getUserFromToken(authHeader);
        if (companyName.length() > 1) {

            if (user.getRole() == Role.ADMIN) {
                StringBuilder createSqlQuery = new StringBuilder("select * from company where status=1 and company_name ILIKE '%" + companyName + "%' ");
                List<Object> list = entityManager.createNativeQuery(createSqlQuery.toString(), Company.class).getResultList();
                CompanyDto[] dtos = mapper.map(list, CompanyDto[].class);
                dtoList = Arrays.asList(dtos);
                return dtoList;
            } else if (user.getRole() == Role.EXPORTER) {

                StringBuilder createSqlQuery = new StringBuilder("select * from company where status=1 and company_name ILIKE '%" + companyName + "%' and userid=" + user.getUserId());
                List<Object> list = entityManager.createNativeQuery(createSqlQuery.toString(), Company.class).getResultList();
                CompanyDto[] dtos = mapper.map(list, CompanyDto[].class);
                dtoList = Arrays.asList(dtos);
                return dtoList;
            } else {
                return dtoList;
            }
        } else {
            return dtoList;
        }
    }

    @Override
    public Page<SingleCompanyDto> getAllWithPagination(String authHeader, Pageable page, SearchCompanyDto dto) throws Exception {
        Page<SingleCompanyDto> pageList = null;
        SingleCompanyDto[] dtos = null;
        StringBuilder createSqlQuery = null;
        Optional<Country> cc = null;
        if(dto.getCountryId() != null){
            cc = countryRepository.findById(dto.getCountryId());
        }
        Page<Company> pageListdata = companyRepository.findByFilterData(
                dto.getCompanyName() == null ? "" : dto.getCompanyName(),
                cc == null ? null : cc.get(),
                dto.getCity() == null ? "" : dto.getCity(),
                page);
        pageList = pageListdata.map(SingleCompanyDto::new);
//        User user = controlService.getUserFromToken(authHeader);
//        if (user.getRole() == Role.ADMIN) {
//            createSqlQuery = new StringBuilder("select * from company where status=1 ");
//            if (dto.getCompanyName() != null)
//                createSqlQuery.append("and company_name ILIKE  '%" + dto.getCompanyName() + "%' ");
//            if (dto.getCountryId() != null) {
//                Optional<Country> optCountry = countryRepository.findById(dto.getCountryId());
//                if (!optCountry.isPresent()) {
//                    log.info("Seçili Ülke Kaydı Bulunamadı..");
//                } else {
//                    createSqlQuery.append("and countryid = " + dto.getCountryId() + " ");
//                }
//            }
//            if (dto.getCity() != null) createSqlQuery.append("and  city ILIKE  '%" + dto.getCity() + "%' ");
//
//            if (dto.getUserId() != null) createSqlQuery.append("and  userid = " + dto.getUserId() + " ");
//
//            if (dto.getCreatedDate() != null)
//                createSqlQuery.append("and  created_date = " + dto.getCreatedDate() + " ");
//
//            if (page.getPageNumber() == 0) {
//                createSqlQuery.append("order by company_name limit " + page.getPageSize() + " offset " + page.getPageNumber());
//            } else {
//                createSqlQuery.append("order by company_name limit " + page.getPageSize() + " offset " + (page.getPageSize() * page.getPageNumber()));
//            }
//
//            List<Object> list = entityManager.createNativeQuery(createSqlQuery.toString(), Company.class).getResultList();
//
//            dtos = mapper.map(list, SingleCompanyDto[].class);
//
//        } else if (user.getRole() == Role.EXPORTER) {
//            createSqlQuery = new StringBuilder("select * from company where status=1 and userid =" + user.getUserId() + " ");
//            if (dto.getCompanyName() != null)
//                createSqlQuery.append("and company_name ILIKE  '%" + dto.getCompanyName() + "%' ");
//            if (dto.getCountryId() != null) {
//                Optional<Country> optCountry = countryRepository.findById(dto.getCountryId());
//                if (!optCountry.isPresent()) {
//                    log.info("Seçili Ülke Kaydı Bulunamadı..");
//                } else {
//                    createSqlQuery.append("and countryid = " + dto.getCountryId() + " ");
//                }
//            }
//            if (dto.getCity() != null) createSqlQuery.append("and  city ILIKE  '%" + dto.getCity() + "%' ");
//
//            if (dto.getCreatedDate() != null)
//                createSqlQuery.append("and  created_date = " + dto.getCreatedDate() + " ");
//
//            if (page.getPageNumber() == 0) {
//                createSqlQuery.append("order by company_name limit " + page.getPageSize() + " offset " + page.getPageNumber());
//            } else {
//                createSqlQuery.append("order by company_name limit " + page.getPageSize() + " offset " + (page.getPageSize() * page.getPageNumber()));
//            }
//
//            List<Object> list = entityManager.createNativeQuery(createSqlQuery.toString(), Company.class).getResultList();
//
//            dtos = mapper.map(list, SingleCompanyDto[].class);
//
//        }
//        List<SingleCompanyDto> dtosList = Arrays.asList(dtos);
//
//        int start = 0;
//        int end = dtosList.size();
//        int totalCount = 0;
//
//
//        if (user.getRole() == Role.ADMIN) {
//            createSqlQuery = new StringBuilder("select count(*) from company where status=1 ");
//            if (dto.getCompanyName() != null)
//                createSqlQuery.append("and company_name ILIKE  '%" + dto.getCompanyName() + "%' ");
//            if (dto.getCountryId() != null) {
//                Optional<Country> optCountry = countryRepository.findById(dto.getCountryId());
//                if (!optCountry.isPresent()) {
//                    log.info("Seçili Ülke Kaydı Bulunamadı..");
//                } else {
//                    createSqlQuery.append("and countryid = " + dto.getCountryId() + " ");
//                }
//            }
//            if (dto.getCity() != null) createSqlQuery.append("and  city ILIKE  '%" + dto.getCity() + "%' ");
//
//            if (dto.getUserId() != null) createSqlQuery.append("and  userid = " + dto.getUserId() + " ");
//
//            if (dto.getCreatedDate() != null)
//                createSqlQuery.append("and  created_date = " + dto.getCreatedDate() + " ");
//
//
//        } else if (user.getRole() == Role.EXPORTER) {
//            createSqlQuery = new StringBuilder("select count(*) from company where status=1 and userid =" + user.getUserId() + " ");
//            if (dto.getCompanyName() != null)
//                createSqlQuery.append("and company_name ILIKE  '%" + dto.getCompanyName() + "%' ");
//            if (dto.getCountryId() != null) {
//                Optional<Country> optCountry = countryRepository.findById(dto.getCountryId());
//                if (!optCountry.isPresent()) {
//                    log.info("Seçili Ülke Kaydı Bulunamadı..");
//                } else {
//                    createSqlQuery.append("and countryid = " + dto.getCountryId() + " ");
//                }
//            }
//            if (dto.getCity() != null) createSqlQuery.append("and  city ILIKE  '%" + dto.getCity() + "%' ");
//
//            if (dto.getCreatedDate() != null)
//                createSqlQuery.append("and  created_date = " + dto.getCreatedDate() + " ");
//
//
//        }
//
//        List<Object> countList = entityManager.createNativeQuery(createSqlQuery.toString()).getResultList();
//        for (Object data : countList) {
//            totalCount = Integer.valueOf(String.valueOf((BigInteger) data));
//        }
//
//        pageList = new PageImpl<>(dtosList.subList(start, end), page, totalCount);
        return pageList;
    }

    @Override
    public CompanyDto findById(Long id) throws Exception {
        Optional<Company> optCompany = companyRepository.findById(id);
        if (!optCompany.isPresent()) {
            log.info("Şirket Kaydı Bulunamadı..");
            throw new Exception("Şirket Kaydı Bulunamadı..");
        }
        CompanyDto dto = mapper.map(optCompany.get(), CompanyDto.class);
        return dto;
    }

    @Override
    public Boolean update(String authHeader, Long companyId, @Valid CompanyDto dto) throws Exception {
        if (companyId != dto.getCompanyId())
            return false;


        User user = controlService.getUserFromToken(authHeader);
        Optional<Country> optCountry = countryRepository.findById(dto.getCountryId());
        if (!optCountry.isPresent()) {
            log.info("Ülke Kaydı Bulunamadı..");
            return false;
        }
        Optional<Company> optCompany = companyRepository.findById(companyId);
        if (!optCompany.isPresent()) {
            log.info("Şirket Kaydı Bulunamadı..");
            return false;
        }
        Company company = optCompany.get();

        /* Cari Kart Kullanıyor */
        String checkingCardName = company.getCompanyName();

        company.setCountry(optCountry.get());
        company.setAddress(dto.getAddress());
        company.setCity(dto.getCity());
        company.setUser(user);
        company.setTaxNo(dto.getTaxNo());
        company.setEmailAddress(dto.getEmailAddress());
        company.setCompanyName(dto.getCompanyName());
        company.setCompanyFax(dto.getCompanyFax());
        company.setCompanyPhone(dto.getCompanyPhone());
        company.setCompanyMobilePhone(dto.getCompanyMobilePhone());
        company = companyRepository.save(company);

        return true;
    }

}
