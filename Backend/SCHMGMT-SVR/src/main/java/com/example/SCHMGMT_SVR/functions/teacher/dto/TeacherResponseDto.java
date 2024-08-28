package com.example.SCHMGMT_SVR.functions.teacher.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class TeacherResponseDto {

    private Long id;

    private String firstName;

    private String lastName;

}
