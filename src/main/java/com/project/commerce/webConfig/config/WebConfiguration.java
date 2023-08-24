package com.project.commerce.webConfig.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;
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
}
