package com.example.SCHMGMT_SVR.models.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ApiResponseModel {
    private Boolean isSuccess;
    private String message;
    private Object resultData;
    private List<String> errorMessages;
    private Object errorCodes;
    private String exceptionType;
}
