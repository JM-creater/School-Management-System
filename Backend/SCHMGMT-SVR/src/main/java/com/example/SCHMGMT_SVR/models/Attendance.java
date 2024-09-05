package com.example.SCHMGMT_SVR.models;

import com.example.SCHMGMT_SVR.models.basemodel.BaseModel;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "attendance")
public class Attendance extends BaseModel {

    @ManyToOne
    @JoinColumn(name = "studentId")
    private Student student;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @Column(name = "status", nullable = false)
    private String status;

    @JsonProperty(value = "isAttendance")
    private boolean isAttendance;

}
