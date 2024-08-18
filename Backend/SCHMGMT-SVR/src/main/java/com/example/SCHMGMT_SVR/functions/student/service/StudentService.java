package com.example.SCHMGMT_SVR.functions.student.service;

import com.example.SCHMGMT_SVR.models.Student;
import com.example.SCHMGMT_SVR.models.Subject;

import java.util.List;

public interface StudentService {
    Student createStudent(Student student);
    List<Student> fetchAllStudent();
    Student fetchStudentById(Long id);
    Student updateStudentById(Long id, Student student);
    String deleteStudentById(Long id);
    long countStudents();
    long countPresentStudents();
    long countLateStudents();
    long countAbsentStudents();
    List<Student> searchStudentsByFirstName(String name);
}
