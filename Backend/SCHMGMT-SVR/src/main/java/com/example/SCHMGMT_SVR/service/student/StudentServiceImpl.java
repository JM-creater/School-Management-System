package com.example.SCHMGMT_SVR.service.student;

import com.example.SCHMGMT_SVR.models.Student;
import com.example.SCHMGMT_SVR.models.Subject;
import com.example.SCHMGMT_SVR.repositories.StudentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public long countStudents() {
        return studentRepository.count();
    }

    @Override
    public long countPresentStudents() {
        return studentRepository.countByStatus("Present");
    }

    @Override
    public long countLateStudents() {
        return studentRepository.countByStatus("Late");
    }

    @Override
    public long countAbsentStudents() {
        return studentRepository.countByStatus("Absent");
    }

    @Override
    public Student createStudent(Student student) {
        student.setCreatedAt(LocalDateTime.now());
        return studentRepository.save(student);
    }

    @Override
    public List<Student> fetchAllStudent() {
        List<Student> allStudents = studentRepository.findAll();
        return allStudents.stream()
                .sorted(Comparator.comparing(Student::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public Student fetchStudentById(Long id) {
        Optional<Student> student = studentRepository.findById(id);
        if(student.isPresent()) {
            return student.get();
        }
        return null;
    }

    @Override
    public Student updateStudentById(Long id, Student student) {
        Optional<Student> optionalStudent = studentRepository.findById(id);

        if (optionalStudent.isPresent()) {
            Student originalStudent = optionalStudent.get();

            if (Objects.nonNull(student.getFirstName()) && !"".equalsIgnoreCase(student.getFirstName())) {
                originalStudent.setFirstName(student.getFirstName());
            }
            if (Objects.nonNull(student.getLastName()) && !"".equalsIgnoreCase(student.getLastName())) {
                originalStudent.setLastName(student.getLastName());
            }
            if (Objects.nonNull(student.getDateOfBirth()) && !"".equalsIgnoreCase(student.getDateOfBirth().toString())) {
                originalStudent.setDateOfBirth(student.getDateOfBirth());
            }
            if (Objects.nonNull(student.getGender()) && !"".equalsIgnoreCase(student.getGender())) {
                originalStudent.setGender(student.getGender());
            }
            if (Objects.nonNull(student.getEmail()) && !"".equalsIgnoreCase(student.getEmail())) {
                originalStudent.setEmail(student.getEmail());
            }
            if (Objects.nonNull(student.getPhoneNumber()) && !"".equalsIgnoreCase(student.getPhoneNumber())) {
                originalStudent.setPhoneNumber(student.getPhoneNumber());
            }
            if (Objects.nonNull(student.getPhoneNumber()) && !"".equalsIgnoreCase(student.getPhoneNumber())) {
                originalStudent.setPhoneNumber(student.getPhoneNumber());
            }
            if (Objects.nonNull(student.getParent())) {
                originalStudent.setParent(student.getParent());
            }
            if (Objects.nonNull(student.getClassroom())) {
                originalStudent.setClassroom(student.getClassroom());
            }
            return studentRepository.save(originalStudent);
        }
        return null;
    }

    @Override
    public String deleteStudentById(Long id) {
        if (studentRepository.findById(id).isPresent()) {
            studentRepository.deleteById(id);
            return "Student deleted successfully";
        } else {
            return "Student not found";
        }
    }

}
