package com.project.commerce.route.api;

import com.project.commerce.country.entity.Country;
import com.project.commerce.route.entity.FrontRoute;
import com.project.commerce.route.repository.FrontRouteRepository;
import com.project.commerce.util.ApiPath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(ApiPath.RouteCtrl.CTRL )
public class RouteApi {
	@Autowired
	private FrontRouteRepository frontRouteRepository;

	@GetMapping("/front-routes")
	public ResponseEntity<List<FrontRoute>> getAll(){
		return ResponseEntity.ok(frontRouteRepository.findAll());
	}

}
