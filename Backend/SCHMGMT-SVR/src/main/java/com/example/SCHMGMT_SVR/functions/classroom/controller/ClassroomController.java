package com.example.SCHMGMT_SVR.functions.classroom.controller;

import com.example.SCHMGMT_SVR.models.Classroom;
import com.example.SCHMGMT_SVR.functions.classroom.service.ClassroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClassroomController {

    @Autowired
    private final ClassroomService classroomService;

    public ClassroomController(ClassroomService classroomService) {
        this.classroomService = classroomService;
    }

    @PostMapping("/classroom")
    public Classroom createClassroom(@RequestBody Classroom classroom) {
        return classroomService.createClassroom(classroom);
    }

    @GetMapping("/classroom/search")
    public List<Classroom> searchByNameOrGrade(
            @RequestParam(required = false) String name
    ) {
        return classroomService.searchClassroomsByName(name);
    }

    @GetMapping("/classroom")
    public List<Classroom> fetchAllClassrooms() {
        return classroomService.fetchAllClassroom();
    }

    @GetMapping("/classroom/{id}")
    public Classroom fetchClassroomById(@PathVariable Long id) {
        return classroomService.fetchClassroomById(id);
    }

    @GetMapping("/classroom/count")
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
