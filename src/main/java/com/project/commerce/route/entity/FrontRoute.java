package com.project.commerce.route.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
import java.util.UUID;

@Data
@Getter
@Setter
@Entity
@Table(name="front_route")
public class FrontRoute {

    @Id
    @SequenceGenerator(name = "sq_front_route", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sq_front_route")
    @Column(name = "front_route_id")
    private Long frontRouteId;

    @Column(name = "path")
    @NotEmpty
    @NotNull
    private String path;

    @Column(name = "key")
    @NotEmpty
    @NotNull
    private String key;

    @Column(name = "protected_route")
    @NotEmpty
    @NotNull
    private Boolean protectedRoute;

}
