package com.example.SCHMGMT_SVR.functions.teacher.service;

import com.example.SCHMGMT_SVR.models.Teacher;

import java.util.List;

public interface TeacherService {
    Teacher createTeacher(Teacher teacher);
    List<Teacher> fetchAllTeacher();
    Teacher fetchTeacherById(Long id);
    Teacher updateTeacherById(Long id, Teacher teacher);
    String deleteTeacherById(Long id);
    long countTeachers();
    List<Teacher> searchTeacherByName(String firstName);
}
