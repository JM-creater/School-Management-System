package com.example.SCHMGMT_SVR.repositories;

import com.example.SCHMGMT_SVR.models.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom, Long> {
    @Query("SELECT c FROM Classroom c WHERE (:name IS NULL OR c.name = :name) AND (:grade IS NULL OR c.grade = :grade)")
    List<Classroom> findByNameOrGrade(@Param("name") String name, @Param("grade") String grade);
}
