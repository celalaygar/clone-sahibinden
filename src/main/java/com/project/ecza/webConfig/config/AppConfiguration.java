package com.project.ecza.webConfig.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties  // application.properties deki değerleri bu class a assign eder.
public class AppConfiguration {
    String uploadPath;
    String uploadBarcodePath;
    String uploadDocsPath;
    String uploadLogoPath;
    //String appJwtSecret;
}
