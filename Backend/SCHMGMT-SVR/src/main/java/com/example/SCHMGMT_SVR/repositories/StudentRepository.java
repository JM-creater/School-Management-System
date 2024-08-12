package com.example.SCHMGMT_SVR.repositories;

import com.example.SCHMGMT_SVR.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}
