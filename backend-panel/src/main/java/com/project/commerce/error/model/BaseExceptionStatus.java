package com.project.commerce.error.model;

import lombok.*;

import java.util.HashMap;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BaseExceptionStatus {
    HashMap<String, String> exceptionStatus;
}
