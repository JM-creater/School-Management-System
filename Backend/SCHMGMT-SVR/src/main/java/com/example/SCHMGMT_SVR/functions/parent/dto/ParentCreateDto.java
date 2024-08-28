package com.example.SCHMGMT_SVR.functions.parent.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ParentCreateDto {

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

}
