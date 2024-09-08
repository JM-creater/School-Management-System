package com.example.SCHMGMT_SVR.functions.subject.controller;

import com.example.SCHMGMT_SVR.functions.subject.dto.SubjectResponseListDto;
import com.example.SCHMGMT_SVR.models.Subject;
import com.example.SCHMGMT_SVR.functions.subject.service.SubjectService;
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
import java.util.Set;

@RequestMapping("/api/v1/subject")
@RestController
public class SubjectController {

    @Autowired
    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @PostMapping
    public Subject createSubject(@RequestBody Subject subject) {
        return subjectService.createSubject(subject);
    }

    @GetMapping("/search-v2")
    public Set<SubjectResponseListDto> fetchSubjects() {
        return subjectService.fetchAllSubjects();
    }


    @GetMapping("/search")
    public List<Subject> searchByNameOrGrade(
            @RequestParam(required = false) String name
    ) {
        return subjectService.searchSubjectsByName(name);
    }

    @GetMapping
    public List<Subject> fetchAllSubjects() {
        return subjectService.fetchAllSubject();
    }

    @GetMapping("/{id}")
    public Subject fetchSubjectById(@PathVariable Long id) {
        return subjectService.fetchSubjectById(id);
    }

    @PutMapping("/{id}")
    public Subject updateSubject(@PathVariable("id") Long id, @RequestBody Subject subject) {
        return subjectService.updateSubjectById(id, subject);
    }

    @DeleteMapping("/{id}")
    public String deleteSubjectId(@PathVariable("id") Long id) {
        return subjectService.deleteSubjectById(id);
    }

    @GetMapping("/count")
    public long countStudents() {
        return subjectService.countSubjects();
    }
}
