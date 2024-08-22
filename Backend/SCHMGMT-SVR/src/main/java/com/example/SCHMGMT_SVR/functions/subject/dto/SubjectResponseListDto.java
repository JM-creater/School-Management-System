package com.example.SCHMGMT_SVR.functions.subject.dto;

import com.example.SCHMGMT_SVR.functions.teacher.dto.TeacherResponseDto;
import com.example.SCHMGMT_SVR.models.Teacher;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class SubjectResponseListDto {

    private String name;

    private String code;

    private int credits;

    private TeacherResponseDto teachers;

    public TeacherResponseDto getTeacher() {
        return teachers;
    }

    public void setTeacher(TeacherResponseDto teacherResponseDto) {
        this.teachers = teacherResponseDto;
    }

}
