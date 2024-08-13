package com.example.SCHMGMT_SVR.controller.classroom;

import com.example.SCHMGMT_SVR.models.Classroom;
import com.example.SCHMGMT_SVR.models.Parent;
import com.example.SCHMGMT_SVR.service.classroom.ClassroomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClassroomController {

    private final ClassroomService classroomService;

    public ClassroomController(ClassroomService classroomService) {
        this.classroomService = classroomService;
    }

    @PostMapping("/classroom")
    public Classroom createClassroom(@RequestBody Classroom classroom) {
        return classroomService.createClassroom(classroom);
    }

    @GetMapping("/classroom")
    public List<Classroom> fetchAllClassrooms() {
        return classroomService.fetchAllClassroom();
    }

    @GetMapping("/classroom/{id}")
    public Classroom fetchClassroomById(@PathVariable Long id) {
        return classroomService.fetchClassroomById(id);
    }

    @DeleteMapping("/classroom/{id}")
    public String deleteClassroomId(@PathVariable("id") Long id) {
        return classroomService.deleteClassroomById(id);
    }

}
