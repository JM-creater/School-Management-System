package com.example.SCHMGMT_SVR.functions.attendance.service;

public interface AttendanceService {

    void markAttendance(Long studentId, String status);
    void updateAttendanceStatus(Long studentId, String status);
}
