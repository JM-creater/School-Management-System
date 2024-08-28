package com.example.SCHMGMT_SVR.functions.subject.service;

import com.example.SCHMGMT_SVR.functions.subject.dto.SubjectResponseListDto;
import com.example.SCHMGMT_SVR.models.Subject;

import java.util.List;
import java.util.Set;

public interface SubjectService {
    Subject createSubject(Subject subject);
    List<Subject> fetchAllSubject();
    Set<SubjectResponseListDto> fetchAllSubjects();
    Subject fetchSubjectById(Long id);
    Subject updateSubjectById(Long id, Subject subject);
    String deleteSubjectById(Long id);
    long countSubjects();
    List<Subject> searchSubjectsByName(String name);
}
