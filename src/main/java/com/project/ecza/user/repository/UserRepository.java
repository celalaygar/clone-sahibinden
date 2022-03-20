package com.project.ecza.user.repository;

import com.project.ecza.user.entity.Role;
import com.project.ecza.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface    UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    List<User> findByRole(Role role);
    List<User> findByRole(Role role, Sort sort);

    List<User> findByUsernameNot(String username, Sort sort);
    Page<User> findByUsernameNot(String username,  Pageable page);



}

