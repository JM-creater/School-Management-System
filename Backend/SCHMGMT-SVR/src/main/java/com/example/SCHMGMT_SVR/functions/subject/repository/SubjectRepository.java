package com.example.SCHMGMT_SVR.functions.subject.repository;

import com.example.SCHMGMT_SVR.models.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    List<Subject> findByNameIgnoreCase(String name);
}
