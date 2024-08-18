package com.example.SCHMGMT_SVR.functions.teacher.repository;

import com.example.SCHMGMT_SVR.models.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    List<Teacher> findByFirstNameContainingIgnoreCase(String firstName);
}
