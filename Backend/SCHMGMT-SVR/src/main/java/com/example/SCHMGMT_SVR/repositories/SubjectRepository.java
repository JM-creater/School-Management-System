package com.example.SCHMGMT_SVR.repositories;

import com.example.SCHMGMT_SVR.models.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
}
