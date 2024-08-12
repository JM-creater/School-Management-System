package com.example.SCHMGMT_SVR.repositories;

import com.example.SCHMGMT_SVR.models.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom, Long> {
}
