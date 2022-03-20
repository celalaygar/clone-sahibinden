package com.project.ecza.company.repository;

import com.project.ecza.company.entity.Company;
import com.project.ecza.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CompanyRepository extends JpaRepository<Company, Long> {

    List<Company> findByUser(User user);
}
