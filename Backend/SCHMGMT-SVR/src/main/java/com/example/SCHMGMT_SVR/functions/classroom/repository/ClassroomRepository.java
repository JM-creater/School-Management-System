package com.example.SCHMGMT_SVR.functions.classroom.repository;

import com.example.SCHMGMT_SVR.models.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom, Long> {
    List<Classroom> findByNameContainingIgnoreCase(String name);
}
