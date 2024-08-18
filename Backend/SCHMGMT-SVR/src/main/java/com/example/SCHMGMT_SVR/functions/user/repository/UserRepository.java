package com.example.SCHMGMT_SVR.functions.user.repository;

import com.example.SCHMGMT_SVR.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
