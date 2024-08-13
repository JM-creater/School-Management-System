package com.example.SCHMGMT_SVR.service.classroom;

import com.example.SCHMGMT_SVR.models.Classroom;
import com.example.SCHMGMT_SVR.models.Parent;
import com.example.SCHMGMT_SVR.models.Teacher;
import com.example.SCHMGMT_SVR.repositories.ClassroomRepository;
import com.example.SCHMGMT_SVR.repositories.TeacherRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassroomServiceImpl implements ClassroomService {

    private final ClassroomRepository classroomRepository;
    private final TeacherRepository teacherRepository;

    public ClassroomServiceImpl(TeacherRepository teacherRepository, ClassroomRepository classroomRepository) {
        this.teacherRepository = teacherRepository;
        this.classroomRepository = classroomRepository;
    }

    @Override
    public Classroom createClassroom(Classroom classroom) {
        if (classroom.getTeacher() != null && classroom.getTeacher().getId() != null) {
            Teacher teacher = teacherRepository.findById(classroom.getTeacher().getId())
                    .orElseThrow(() -> new RuntimeException("Teacher not found"));
            classroom.setTeacher(teacher);
        }
        classroom.setCreatedAt(LocalDateTime.now());
        return classroomRepository.save(classroom);
    }

    @Override
    public List<Classroom> fetchAllClassroom() {
        List<Classroom> allClassroom = classroomRepository.findAll();
        return allClassroom.stream()
                .sorted(Comparator.comparing(Classroom::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }

}
