package com.example.SCHMGMT_SVR.service.classroom;

import com.example.SCHMGMT_SVR.models.Classroom;
import com.example.SCHMGMT_SVR.models.dto.ClassroomStudentCountDto;

import java.util.List;

public interface ClassroomService {
    Classroom createClassroom(Classroom classroom);
    List<Classroom> fetchAllClassroom();
    Classroom fetchClassroomById(Long id);
    Classroom updateClassRoomById(Long id, Classroom classroom);
    String deleteClassroomById(Long id);
    Long countClassrooms();
    List<ClassroomStudentCountDto> getClassroomStudentCounts();
}
