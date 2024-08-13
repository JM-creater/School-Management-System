package com.example.SCHMGMT_SVR.repositories;

import com.example.SCHMGMT_SVR.models.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom, Long> {
}
