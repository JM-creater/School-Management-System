package com.example.SCHMGMT_SVR.service.student;

import com.example.SCHMGMT_SVR.models.Student;
import com.example.SCHMGMT_SVR.repositories.StudentRepository;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

}
