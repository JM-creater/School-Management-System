package com.example.SCHMGMT_SVR.service.subject;
;
import com.example.SCHMGMT_SVR.models.Subject;
import com.example.SCHMGMT_SVR.repositories.SubjectRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SubjectServiceImpl implements SubjectService{

    private final SubjectRepository subjectRepository;

    public SubjectServiceImpl(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
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
    public Subject fetchSubjectById(Long id) {
        Optional<Subject> subject = subjectRepository.findById(id);
        if(subject.isPresent()) {
            return subject.get();
        }
        return null;
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
