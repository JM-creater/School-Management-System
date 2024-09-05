package com.example.SCHMGMT_SVR.models;

import com.example.SCHMGMT_SVR.models.basemodel.BaseModel;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
@Table(name = "teacher")
public class Teacher extends BaseModel {

    @Column(name = "firstName", length = 100)
    private String firstName;

    @Column(name = "lastName", length = 100)
    private String lastName;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "phoneNumber", length = 100)
    private String phoneNumber;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate employmentDate;

    @Column(name = "address", length = 100)
    private String address;

    @ManyToOne
    @JoinColumn(name = "classroomId")
    @JsonManagedReference
    private Classroom classroom;

}
