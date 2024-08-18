package com.example.SCHMGMT_SVR.functions.subject.service;

import com.example.SCHMGMT_SVR.models.Subject;

import java.util.List;

public interface SubjectService {
    Subject createSubject(Subject subject);
    List<Subject> fetchAllSubject();
    Subject fetchSubjectById(Long id);
    Subject updateSubjectById(Long id, Subject subject);
    String deleteSubjectById(Long id);
    long countSubjects();
    List<Subject> searchSubjectsByName(String name);
}
