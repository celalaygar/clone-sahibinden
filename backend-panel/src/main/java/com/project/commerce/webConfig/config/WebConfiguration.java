package com.project.commerce.webConfig.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;
import java.util.Arrays;
import java.util.concurrent.TimeUnit;


@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    @Autowired
    AppConfiguration app;
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry.addResourceHandler("image/**").addResourceLocations("file:./"+app.getUploadPath()+"/")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS));
    }

    @Bean
    CommandLineRunner createStorageDirectory() {
        return (args) ->{
            File folder = new File(app.getUploadPath());
            Boolean control = folder.exists() && folder.isDirectory();
            if(!control)  folder.mkdir();
            folder = new File(app.getUploadPath()+"/"+app.getUploadBarcodePath());
            control = folder.exists() && folder.isDirectory();
            if(!control)   folder.mkdir();
            folder = new File(app.getUploadDocsPath());
            control = folder.exists() && folder.isDirectory();
            if(!control)  folder.mkdir();
        };
    }


    @Bean
    public CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*"); // this allows all origin
        config.addAllowedHeader("*"); // this allows all headers
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("HEAD");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("PATCH");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token","isRefreshToken"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
