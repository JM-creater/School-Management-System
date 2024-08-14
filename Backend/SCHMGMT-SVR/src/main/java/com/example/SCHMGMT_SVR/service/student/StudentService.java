package com.example.SCHMGMT_SVR.service.student;

import com.example.SCHMGMT_SVR.models.Student;

import java.util.List;

public interface StudentService {
    Student createStudent(Student student);

    List<Student> fetchAllStudent();

    Student fetchStudentById(Long id);

    Student updateStudentById(Long id, Student student);

    String deleteStudentById(Long id);

    long countStudents();
}
