package com.project.commerce.route.repository;

import com.project.commerce.route.entity.FrontRoute;
import com.project.commerce.user.entity.Role;
import com.project.commerce.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FrontRouteRepository extends JpaRepository<FrontRoute, Long> {

}

