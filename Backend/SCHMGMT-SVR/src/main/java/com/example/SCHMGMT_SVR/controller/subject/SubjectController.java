package com.example.SCHMGMT_SVR.controller.subject;

import com.example.SCHMGMT_SVR.models.Classroom;
import com.example.SCHMGMT_SVR.models.Subject;
import com.example.SCHMGMT_SVR.service.subject.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SubjectController {

    @Autowired
    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @PostMapping("/subject")
    public Subject createSubject(@RequestBody Subject subject) {
        return subjectService.createSubject(subject);
    }

    @GetMapping("/subject/search")
    public List<Subject> searchByNameOrGrade(
            @RequestParam(required = false) String name
    ) {
        return subjectService.searchSubjectsByName(name);
    }

    @GetMapping("/subject")
    public List<Subject> fetchAllSubjects() {
        return subjectService.fetchAllSubject();
    }

    @GetMapping("/subject/{id}")
    public Subject fetchSubjectById(@PathVariable Long id) {
        return subjectService.fetchSubjectById(id);
    }

    @PutMapping("/subject/{id}")
    public Subject updateSubject(@PathVariable("id") Long id, @RequestBody Subject subject) {
        return subjectService.updateSubjectById(id, subject);
    }

    @DeleteMapping("/subject/{id}")
    public String deleteSubjectId(@PathVariable("id") Long id) {
        return subjectService.deleteSubjectById(id);
    }

    @GetMapping("/subject/count")
    public long countStudents() {
        return subjectService.countSubjects();
    }
}