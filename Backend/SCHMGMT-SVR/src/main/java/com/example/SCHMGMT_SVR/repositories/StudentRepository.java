package com.example.SCHMGMT_SVR.repositories;

import com.example.SCHMGMT_SVR.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    @Query("SELECT COUNT(s) FROM Student s WHERE s.status = :status")
    long countByStatus(@Param("status") String status);
}
