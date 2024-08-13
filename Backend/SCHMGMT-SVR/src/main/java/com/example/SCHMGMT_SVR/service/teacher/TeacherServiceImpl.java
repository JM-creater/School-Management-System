package com.example.SCHMGMT_SVR.service.teacher;

import com.example.SCHMGMT_SVR.models.Teacher;
import com.example.SCHMGMT_SVR.repositories.TeacherRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;

    public TeacherServiceImpl(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @Override
    public Teacher createTeacher(Teacher teacher) {
        teacher.setCreatedAt(LocalDateTime.now());
        return teacherRepository.save(teacher);
    }

    @Override
    public List<Teacher> fetchAllTeacher() {
        List<Teacher> allTeachers = teacherRepository.findAll();
        return allTeachers.stream()
                .sorted(Comparator.comparing(Teacher::getCreatedAt, Comparator.nullsLast(Comparator.naturalOrder())).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public Teacher fetchTeacherById(Long id) {
        Optional<Teacher> teacher = teacherRepository.findById(id);
        if(teacher.isPresent()) {
            return teacher.get();
        }
        return null;
    }

    @Override
    public Teacher updateTeacherById(Long id, Teacher teacher) {
        Optional<Teacher> optionalTeacher = teacherRepository.findById(id);

        if (optionalTeacher.isPresent()) {
            Teacher originalTeacher = optionalTeacher.get();

            if (Objects.nonNull(teacher.getFirstName()) && !"".equalsIgnoreCase(teacher.getFirstName())) {
                originalTeacher.setFirstName(teacher.getFirstName());
            }
            if (Objects.nonNull(teacher.getLastName()) && !"".equalsIgnoreCase(teacher.getLastName())) {
                originalTeacher.setLastName(teacher.getLastName());
            }
            if (Objects.nonNull(teacher.getEmail()) && !"".equalsIgnoreCase(teacher.getEmail())) {
                originalTeacher.setEmail(teacher.getEmail());
            }
            if (Objects.nonNull(teacher.getPhoneNumber()) && !"".equalsIgnoreCase(teacher.getPhoneNumber())) {
                originalTeacher.setPhoneNumber(teacher.getPhoneNumber());
            }
            if (Objects.nonNull(teacher.getDateOfBirth()) && !"".equalsIgnoreCase(teacher.getDateOfBirth().toString())) {
                originalTeacher.setDateOfBirth(teacher.getDateOfBirth());
            }
            if (Objects.nonNull(teacher.getEmploymentDate()) && !"".equalsIgnoreCase(teacher.getEmploymentDate().toString())) {
                originalTeacher.setEmploymentDate(teacher.getEmploymentDate());
            }
            if (Objects.nonNull(teacher.getAddress()) && !"".equalsIgnoreCase(teacher.getAddress())) {
                originalTeacher.setAddress(teacher.getAddress());
            }
            if (Objects.nonNull(teacher.getClassroom())) {
                originalTeacher.setClassroom(teacher.getClassroom());
            }
            return teacherRepository.save(originalTeacher);
        }
        return null;
    }

    @Override
    public String deleteTeacherById(Long id) {
        if (teacherRepository.findById(id).isPresent()) {
            teacherRepository.deleteById(id);
            return "Teacher deleted successfully";
        } else {
            return "Teacher not found";
        }
    }
}
