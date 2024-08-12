package com.example.SCHMGMT_SVR.repositories;

import com.example.SCHMGMT_SVR.models.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentRepository extends JpaRepository<Parent, Long> {
}
