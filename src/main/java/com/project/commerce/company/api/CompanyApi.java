package com.project.commerce.company.api;

import com.project.commerce.company.dto.CompanyDto;
import com.project.commerce.company.dto.CompanyParams;
import com.project.commerce.company.dto.SearchCompanyDto;
import com.project.commerce.company.dto.SingleCompanyDto;
import com.project.commerce.company.service.CompanyService;
import com.project.commerce.util.ApiPath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(ApiPath.AdminCompanyCtrl.CTRL)
public class CompanyApi {

    @Autowired
    private CompanyService companyService;


    // yurt dışı şirket kaydı yapar
    @PostMapping
    public ResponseEntity<Boolean> save(@RequestHeader("Authorization") String authHeader,
                                        @Valid @RequestBody CompanyDto dto) throws Exception {
        return ResponseEntity.ok(companyService.save(authHeader,dto));
    }

    // şirketleri sayfalama yaparak getirir
    @PostMapping("/page")
    public ResponseEntity<Page<SingleCompanyDto>> getAllWithPagination(
            @RequestHeader("Authorization") String authHeader ,
            @PageableDefault(size = 3,direction = Sort.Direction.DESC) Pageable page,
    @RequestBody SearchCompanyDto dto) throws Exception {
        return ResponseEntity.ok(companyService.getAllWithPagination(authHeader, page,dto));
    }

    // ihracatçının yada adminin kayıt ettiği companyid ye bağlı 1 şirketi getirir
    @GetMapping("/find-by-id/{id}")
    public ResponseEntity<CompanyDto> findById(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(companyService.findById(id));
    }

    // ihracatçının yada adminin kayıt ettiği şirket ile ilgili bir güncelleme yapar
    @PutMapping("/{companyId}")
    public ResponseEntity<Boolean> update(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long companyId,
            @Valid @RequestBody CompanyDto dto) throws Exception {
        return ResponseEntity.ok(companyService.update(authHeader,companyId, dto));
    }

    // search edilebilir company combobox için kullanılan bir fonksiyondur.
    @PostMapping("/find-by-searching")
    public ResponseEntity<List<CompanyDto>> findBySearching(
            @RequestHeader("Authorization") String authHeader,@RequestBody CompanyParams params  ) throws Exception {
        return ResponseEntity.ok(companyService.findBySearching(authHeader,params.getCompanyName()));
    }

}
