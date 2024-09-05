package com.example.SCHMGMT_SVR.functions.attendance.controller;

import com.example.SCHMGMT_SVR.functions.attendance.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/attendance")
@RestController
public class AttendanceController {

    @Autowired
    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/{studentId}/present")
    public ResponseEntity<String> markPresent(@PathVariable Long studentId) {
        attendanceService.markAttendance(studentId, "Present");
        return ResponseEntity.ok("Student marked as Present");
    }

    @PostMapping("/{studentId}/late")
    public ResponseEntity<String> markLate(@PathVariable Long studentId) {
        attendanceService.markAttendance(studentId, "Late");
        return ResponseEntity.ok("Student marked as Late");
    }

    @PostMapping("/{studentId}/absent")
    public ResponseEntity<String> markAbsent(@PathVariable Long studentId) {
        attendanceService.markAttendance(studentId, "Absent");
        return ResponseEntity.ok("Student marked as Absent");
    }

    @PutMapping("/status/{studentId}/present")
    public ResponseEntity<String> statusPresent(@PathVariable Long studentId) {
        attendanceService.updateAttendanceStatus(studentId, "Present");
        return ResponseEntity.ok("Student marked as Present");
    }

    @PutMapping("/status/{studentId}/late")
    public ResponseEntity<String> statusLate(@PathVariable Long studentId) {
        attendanceService.updateAttendanceStatus(studentId, "Late");
        return ResponseEntity.ok("Student marked as Late");
    }

    @PutMapping("/status/{studentId}/absent")
    public ResponseEntity<String> statusAbsent(@PathVariable Long studentId) {
        attendanceService.updateAttendanceStatus(studentId, "Absent");
        return ResponseEntity.ok("Student marked as Absent");
    }
}
