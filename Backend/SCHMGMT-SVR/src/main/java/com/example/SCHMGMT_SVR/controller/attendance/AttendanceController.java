package com.example.SCHMGMT_SVR.controller.attendance;

import com.example.SCHMGMT_SVR.service.attendance.AttendanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/attendance/{studentId}/present")
    public ResponseEntity<String> markPresent(@PathVariable Long studentId) {
        attendanceService.markAttendance(studentId, "Present");
        return ResponseEntity.ok("Student marked as Present");
    }

    @PostMapping("/attendance/{studentId}/late")
    public ResponseEntity<String> markLate(@PathVariable Long studentId) {
        attendanceService.markAttendance(studentId, "Late");
        return ResponseEntity.ok("Student marked as Late");
    }

    @PostMapping("/attendance/{studentId}/absent")
    public ResponseEntity<String> markAbsent(@PathVariable Long studentId) {
        attendanceService.markAttendance(studentId, "Absent");
        return ResponseEntity.ok("Student marked as Absent");
    }

    @PutMapping("/attendance/status/{studentId}/present")
    public ResponseEntity<String> statusPresent(@PathVariable Long studentId) {
        attendanceService.updateAttendanceStatus(studentId, "Present");
        return ResponseEntity.ok("Student marked as Present");
    }

    @PutMapping("/attendance/status/{studentId}/late")
    public ResponseEntity<String> statusLate(@PathVariable Long studentId) {
        attendanceService.updateAttendanceStatus(studentId, "Late");
        return ResponseEntity.ok("Student marked as Late");
    }

    @PutMapping("/attendance/status/{studentId}/absent")
    public ResponseEntity<String> statusAbsent(@PathVariable Long studentId) {
        attendanceService.updateAttendanceStatus(studentId, "Absent");
        return ResponseEntity.ok("Student marked as Absent");
    }
}
