package com.example.SCHMGMT_SVR.functions.classroom.service;

import com.example.SCHMGMT_SVR.models.Classroom;

import java.util.List;

public interface ClassroomService {
    Classroom createClassroom(Classroom classroom);
    List<Classroom> fetchAllClassroom();
    Classroom fetchClassroomById(Long id);
    Classroom updateClassRoomById(Long id, Classroom classroom);
    String deleteClassroomById(Long id);
    Long countClassrooms();
    List<Classroom> searchClassroomsByName(String name);
}
