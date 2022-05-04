package com.project.ecza.company.repository;

import com.project.ecza.company.entity.Company;
import com.project.ecza.country.entity.Country;
import com.project.ecza.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CompanyRepository extends JpaRepository<Company, Long> {

    List<Company> findByUser(User user);

    @Query(value = "select c from Company c where  " +
            "(:companyName is null or lower( c.companyName ) like lower(concat('%', :companyName,'%')) ) and  " +
            "(:country is null or c.country = :country) and  " +
            "(:city is null or lower( c.city ) like lower(concat('%', :city,'%')) )  " +
            "order by c.companyName "
    )
    Page<Company> findByFilterData(@Param("companyName") String companyName,
                                   @Param("country") Country country,
                                   @Param("city") String city,Pageable page);




}
