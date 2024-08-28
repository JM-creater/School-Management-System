package com.example.SCHMGMT_SVR.functions.teacher.controller;

import com.example.SCHMGMT_SVR.models.Teacher;
import com.example.SCHMGMT_SVR.functions.teacher.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/teacher")
@RestController
public class TeacherController {

    @Autowired
    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping
    public Teacher createTeacher(@RequestBody Teacher teacher) {
        return teacherService.createTeacher(teacher);
    }

    @GetMapping
    public List<Teacher> fetchAllTeachers() {
        return teacherService.fetchAllTeacher();
    }

    @GetMapping("/search")
    public List<Teacher> searchByNameOrGrade(
            @RequestParam(required = false) String firstName
    ) {
        return teacherService.searchTeacherByName(firstName);
    }

    @GetMapping("/{id}")
    public Teacher fetchTeacherById(@PathVariable Long id) {
        return teacherService.fetchTeacherById(id);
    }

    @GetMapping("/count")
    public long countStudents() {
        return teacherService.countTeachers();
    }

    @PutMapping("/{id}")
    public Teacher updateTeacher(@PathVariable("id") Long id, @RequestBody Teacher teacher) {
        return teacherService.updateTeacherById(id, teacher);
    }

    @DeleteMapping("/{id}")
    public String deleteTeacherById(@PathVariable("id") Long id) {
        return teacherService.deleteTeacherById(id);
    }
}
