package com.example.SCHMGMT_SVR.models;

import com.example.SCHMGMT_SVR.models.base.BaseModel;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "student")
public class Student extends BaseModel {

    @Column(name = "firstName", length = 100)
    private String firstName;

    @Column(name = "lastName", length = 100)
    private String lastName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    @Column(name = "gender", length = 10)
    private String gender;

    @Column(name = "address", length = 100)
    private String address;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "phoneNumber", length = 100)
    private String phoneNumber;

    @Column(name = "status", length = 100)
    private String status;

    @JsonProperty(value = "isAttendance")
    private boolean isAttendance;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate enrollmentDate;

    @ManyToOne
    @JoinColumn(name = "parentId")
    @JsonManagedReference
    private Parent parent;

    @ManyToOne
    @JoinColumn(name = "classroomId")
    @JsonManagedReference
    private Classroom classroom;

}
