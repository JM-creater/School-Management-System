package com.example.SCHMGMT_SVR.functions.teacher.controller;

import com.example.SCHMGMT_SVR.models.Teacher;
import com.example.SCHMGMT_SVR.functions.teacher.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TeacherController {

    @Autowired
    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping("/teacher")
    public Teacher createTeacher(@RequestBody Teacher teacher) {
        return teacherService.createTeacher(teacher);
    }

    @GetMapping("/teacher")
    public List<Teacher> fetchAllTeachers() {
        return teacherService.fetchAllTeacher();
    }

    @GetMapping("/teacher/search")
    public List<Teacher> searchByNameOrGrade(
            @RequestParam(required = false) String firstName
    ) {
        return teacherService.searchTeacherByName(firstName);
    }

    @GetMapping("/teacher/{id}")
    public Teacher fetchTeacherById(@PathVariable Long id) {
        return teacherService.fetchTeacherById(id);
    }

    @GetMapping("/teacher/count")
    public long countStudents() {
        return teacherService.countTeachers();
    }

    @PutMapping("/teacher/{id}")
    public Teacher updateTeacher(@PathVariable("id") Long id, @RequestBody Teacher teacher) {
        return teacherService.updateTeacherById(id, teacher);
    }

    @DeleteMapping("/teacher/{id}")
    public String deleteTeacherById(@PathVariable("id") Long id) {
        return teacherService.deleteTeacherById(id);
    }
}