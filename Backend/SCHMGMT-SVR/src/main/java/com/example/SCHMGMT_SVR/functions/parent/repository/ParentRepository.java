package com.example.SCHMGMT_SVR.functions.parent.repository;

import com.example.SCHMGMT_SVR.models.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParentRepository extends JpaRepository<Parent, Long> {

    @Query("SELECT p FROM Parent p WHERE LOWER(p.firstName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Parent> findByFirstNameIgnoreCase(@Param("name") String name);

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Parent p WHERE p.email = :email")
    boolean existsByEmail(@Param("email") String email);
    
    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Parent p WHERE p.phoneNumber = :phoneNumber")
    boolean existsByPhoneNumber(@Param("phoneNumber") String phoneNumber);
}
