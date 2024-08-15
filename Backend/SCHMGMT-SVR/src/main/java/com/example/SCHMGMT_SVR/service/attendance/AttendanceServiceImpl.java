package com.example.SCHMGMT_SVR.service.attendance;

import com.example.SCHMGMT_SVR.models.Attendance;
import com.example.SCHMGMT_SVR.models.Student;
import com.example.SCHMGMT_SVR.repositories.AttendanceRepository;
import com.example.SCHMGMT_SVR.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    @Autowired
    private final AttendanceRepository attendanceRepository;
    @Autowired
    private final StudentRepository studentRepository;

    public AttendanceServiceImpl(AttendanceRepository attendanceRepository, StudentRepository studentRepository) {
        this.attendanceRepository = attendanceRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public void markAttendance(Long studentId, String status) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid student ID"));

        Attendance attendance = new Attendance();
        attendance.setStudent(student);
        attendance.setStatus(status);
        attendance.setDate(LocalDate.now());
        attendance.setAttendance(true);
        attendance.setCreatedAt(LocalDateTime.now());

        attendanceRepository.save(attendance);
    }

    @Override
    public void updateAttendanceStatus(Long studentId, String status) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid student ID"));

        student.setStatus(status);
        student.setAttendance(true);
        studentRepository.save(student);
    }
}
