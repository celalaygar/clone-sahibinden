package com.project.commerce.role.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
@Entity
@Table(name="role")
public class Role {

    @Id
    @SequenceGenerator(name = "sq_role", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sq_role")
    @Column(name = "role_id")
    private Long roleId;

    @Column(name = "role_name")
    @NotEmpty
    @NotNull
    private String roleName;

    @Column(name = "description_tr")
    @NotEmpty
    @NotNull
    private String descriptionTr;

    @Column(name = "description_en")
    @NotEmpty
    @NotNull
    private String descriptionEn;

}
