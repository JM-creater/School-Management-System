package com.example.SCHMGMT_SVR.repositories;

import com.example.SCHMGMT_SVR.models.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}