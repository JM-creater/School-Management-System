package com.example.SCHMGMT_SVR.functions.classroom.controller;

import com.example.SCHMGMT_SVR.models.Classroom;
import com.example.SCHMGMT_SVR.functions.classroom.service.ClassroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/classroom")
public class ClassroomController {

    @Autowired
    private final ClassroomService classroomService;

    public ClassroomController(ClassroomService classroomService) {
        this.classroomService = classroomService;
    }

    @PostMapping
    public Classroom createClassroom(@RequestBody Classroom classroom) {
        return classroomService.createClassroom(classroom);
    }

    @GetMapping("/search")
    public List<Classroom> searchByNameOrGrade(
            @RequestParam(required = false) String name
    ) {
        return classroomService.searchClassroomsByName(name);
    }

    @GetMapping
    public List<Classroom> fetchAllClassrooms() {
        return classroomService.fetchAllClassroom();
    }

    @GetMapping("/{id}")
    public Classroom fetchClassroomById(@PathVariable Long id) {
        return classroomService.fetchClassroomById(id);
    }

    @GetMapping("/count")
    public long countClassroom() {
        return classroomService.countClassrooms();
    }

    @PutMapping("/classroom/{id}")
    public Classroom updateClassroomById(@PathVariable("id") Long id, @RequestBody Classroom classroom) {
        return classroomService.updateClassRoomById(id, classroom);
    }

    @DeleteMapping("/classroom/{id}")
    public String deleteClassroomById(@PathVariable("id") Long id) {
        return classroomService.deleteClassroomById(id);
    }
}
