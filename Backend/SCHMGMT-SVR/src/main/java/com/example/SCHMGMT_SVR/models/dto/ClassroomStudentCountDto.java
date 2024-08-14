package com.example.SCHMGMT_SVR.models.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;

@Getter
@Setter
@AllArgsConstructor
public class ClassroomStudentCountDto {
    private String className;
    private int studentCount;
}
