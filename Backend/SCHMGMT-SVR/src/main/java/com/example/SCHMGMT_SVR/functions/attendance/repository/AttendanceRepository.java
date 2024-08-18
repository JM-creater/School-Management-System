package com.example.SCHMGMT_SVR.functions.attendance.repository;

import com.example.SCHMGMT_SVR.models.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
}
