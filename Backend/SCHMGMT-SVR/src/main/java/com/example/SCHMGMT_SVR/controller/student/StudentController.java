package com.example.SCHMGMT_SVR.controller.student;

import com.example.SCHMGMT_SVR.models.Student;
import com.example.SCHMGMT_SVR.service.student.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/student")
    public Student createStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
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
}
