package com.project.commerce.error.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.commerce.error.model.BaseExceptionStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Map;

@Service
public class JsonFileConverterService {


    public String readDataFromJson() throws IOException {
        File file = ResourceUtils.getFile("classpath:data/data.json");

        String content = new String(Files.readAllBytes(file.toPath()));
        ObjectMapper mapper = new ObjectMapper();
        Map<String,Object> map = mapper.readValue(content, Map.class);

        BaseExceptionStatus result = mapper.readValue(content, BaseExceptionStatus.class);
        return content.toString();
    }
    public BaseExceptionStatus getBaseExceptionStatus() throws IOException {
        File file = ResourceUtils.getFile("classpath:data/data.json");

        ObjectMapper mapper = new ObjectMapper();
        String content = new String(Files.readAllBytes(file.toPath()));

        BaseExceptionStatus result = mapper.readValue(content, BaseExceptionStatus.class);
        return result;
    }
}
