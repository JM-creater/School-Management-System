package com.example.SCHMGMT_SVR.functions.subject.dto;

import com.example.SCHMGMT_SVR.functions.teacher.dto.TeacherResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
