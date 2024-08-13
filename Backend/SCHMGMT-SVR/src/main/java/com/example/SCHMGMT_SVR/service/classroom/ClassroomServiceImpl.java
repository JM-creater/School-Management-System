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
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClassroomServiceImpl implements ClassroomService {

    private final ClassroomRepository classroomRepository;

    public ClassroomServiceImpl(ClassroomRepository classroomRepository) {
        this.classroomRepository = classroomRepository;
    }

    @Override
    public Classroom createClassroom(Classroom classroom) {
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

    @Override
    public Classroom fetchClassroomById(Long id) {
        Optional<Classroom> classroom = classroomRepository.findById(id);
        if(classroom.isPresent()) {
            return classroom.get();
        }
        return null;
    }

    @Override
    public String deleteClassroomById(Long id) {
        if (classroomRepository.findById(id).isPresent()) {
            classroomRepository.deleteById(id);
            return "Classroom deleted successfully";
        } else {
            return "Classroom not found";
        }
    }

}