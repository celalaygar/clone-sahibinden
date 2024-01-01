package com.project.commerce.webConfig.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties  // application.yml deki değerleri bu class a assign eder.
public class AppConfiguration {
    String uploadPath;
    String uploadBarcodePath;
    String uploadDocsPath;
    String uploadLogoPath;
    //String appJwtSecret;
}
