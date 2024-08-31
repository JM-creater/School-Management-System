package com.example.SCHMGMT_SVR.functions.subject.service;

import com.example.SCHMGMT_SVR.functions.subject.dto.SubjectResponseListDto;
import com.example.SCHMGMT_SVR.functions.teacher.dto.TeacherResponseDto;
import com.example.SCHMGMT_SVR.models.Subject;
import com.example.SCHMGMT_SVR.functions.subject.repository.SubjectRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import java.util.List;
import java.util.Objects;
import java.util.Comparator;
import java.util.Set;
import java.util.HashSet;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SubjectServiceImpl implements SubjectService{

    @Autowired
    private final SubjectRepository subjectRepository;

    public SubjectServiceImpl(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    @Override
    public long countSubjects() {
        return subjectRepository.count();
    }

    @Override
    public List<Subject> searchSubjectsByName(String name) {
        if (Objects.nonNull(name) && !name.isEmpty()) {
            return subjectRepository.findByNameIgnoreCase(name);
        } else {
            return subjectRepository.findAll();
        }
    }

    @Override
    public Subject createSubject(Subject subject) {
        subject.setCreatedAt(LocalDateTime.now());
        return subjectRepository.save(subject);
    }

    @Override
    public List<Subject> fetchAllSubject() {
        List<Subject> allSubjects = subjectRepository.findAll();
        return allSubjects.stream()
                .sorted(Comparator.comparing(Subject::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public Set<SubjectResponseListDto> fetchAllSubjects() {
        List<Subject> allSubjects = subjectRepository.findAll();

        Set<SubjectResponseListDto> subjectResponseListDto = new HashSet<>();

        for(Subject subject : allSubjects) {
            SubjectResponseListDto subjectResponse = new SubjectResponseListDto();
            BeanUtils.copyProperties(subject, subjectResponse);

            TeacherResponseDto teacherResponseDto = new TeacherResponseDto();
            BeanUtils.copyProperties(subject.getTeacher(), teacherResponseDto);

            subjectResponse.setTeacher(teacherResponseDto);

            subjectResponseListDto.add(subjectResponse);
        }

        return subjectResponseListDto;
    }

    @Override
    public Subject fetchSubjectById(Long id) {
        Optional<Subject> subject = subjectRepository.findById(id);
        return subject.orElse(null);
    }

    @Override
    public Subject updateSubjectById(Long id, Subject subject) {
        Optional<Subject> optionalSubject = subjectRepository.findById(id);

        if (optionalSubject.isPresent()) {
            Subject originalSubject = optionalSubject.get();

            if (Objects.nonNull(subject.getName()) && !"".equalsIgnoreCase(subject.getName())) {
                originalSubject.setName(subject.getName());
            }
            if (Objects.nonNull(subject.getCode()) && !"".equalsIgnoreCase(subject.getCode())) {
                originalSubject.setCode(subject.getCode());
            }
            if (subject.getCredits() > 0) {
                originalSubject.setCredits(subject.getCredits());
            }
            if (Objects.nonNull(subject.getTeacher())) {
                originalSubject.setTeacher(subject.getTeacher());
            }
            return subjectRepository.save(originalSubject);
        }
        return null;
    }

    @Override
    public String deleteSubjectById(Long id) {
        if (subjectRepository.findById(id).isPresent()) {
            subjectRepository.deleteById(id);
            return "Subject deleted successfully";
        } else {
            return "Subject not found";
        }
    }

}
