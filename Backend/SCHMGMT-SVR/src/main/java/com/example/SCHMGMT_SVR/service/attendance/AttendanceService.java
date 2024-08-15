package com.example.SCHMGMT_SVR.service.attendance;

public interface AttendanceService {

    void markAttendance(Long studentId, String status);
    void updateAttendanceStatus(Long studentId, String status);
}
