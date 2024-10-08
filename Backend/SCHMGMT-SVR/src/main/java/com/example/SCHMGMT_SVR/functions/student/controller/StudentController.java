package com.example.SCHMGMT_SVR.functions.student.controller;

import com.example.SCHMGMT_SVR.models.Student;
import com.example.SCHMGMT_SVR.functions.student.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;

@RestController
public class StudentController {

    @Autowired
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/student")
    public Student createStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
    }

    @GetMapping("/student/search")
    public List<Student> searchByNameOrGrade(
            @RequestParam(required = false) String name
    ) {
        return studentService.searchStudentsByFirstName(name);
    }

    @GetMapping("/student")
    public List<Student> fetchAllStudents() {
        return studentService.fetchAllStudent();
    }

    @GetMapping("/student/{id}")
    public Student fetchStudentById(@PathVariable Long id) {
        return studentService.fetchStudentById(id);
    }

    @PutMapping("/student/{id}")
    public Student updateStudent(@PathVariable("id") Long id, @RequestBody Student student) {
        return studentService.updateStudentById(id, student);
    }

    @DeleteMapping("/student/{id}")
    public String deleteStudentId(@PathVariable("id") Long id) {
        return studentService.deleteStudentById(id);
    }

    @GetMapping("/student/count")
    public long countStudents() {
        return studentService.countStudents();
    }

    @GetMapping("/student/count/present")
    public long countPresentStudents() {
        return studentService.countPresentStudents();
    }

    @GetMapping("/student/count/late")
    public long countLateStudents() {
        return studentService.countLateStudents();
    }

    @GetMapping("/student/count/absent")
    public long countAbsentStudents() {
        return studentService.countAbsentStudents();
    }
}
