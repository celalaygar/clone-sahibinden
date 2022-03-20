package com.project.ecza.country.api;

import com.project.ecza.country.entity.Country;
import com.project.ecza.util.ApiPath;
import com.project.ecza.country.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(ApiPath.CountryCtrl.CTRL )
public class CountryApi {
	@Autowired
	private CountryService countryService;

	@GetMapping("/get-all")
	public ResponseEntity<List<Country>> getAll(){
		return ResponseEntity.ok(countryService.getAll());
	}

	@PostMapping("/save")
	public ResponseEntity<Boolean> save(@Valid @RequestBody Country country){
		return ResponseEntity.ok(countryService.save(country));
	}
	@PostMapping("/update/{id}")
	public ResponseEntity<Boolean> update(@PathVariable Long id, @Valid @RequestBody Country country){
		return ResponseEntity.ok(countryService.update(id, country));
	}
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Boolean> delete(@PathVariable Long id){
		return ResponseEntity.ok(countryService.delete(id));
	}
}
