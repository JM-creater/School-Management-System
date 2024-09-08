package com.example.SCHMGMT_SVR.models;

import com.example.SCHMGMT_SVR.models.base.BaseModel;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
@Table(name = "exam")
public class Exam extends BaseModel {

    @Column(name = "examDate", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate examDate;

    @Column(name = "examType", nullable = false, length = 50)
    private String examType;

    @Column(name = "score", nullable = false)
    private int score;

    @ManyToOne
    @JoinColumn(name = "courseId")
    @JsonManagedReference
    private Course course;

    @ManyToOne
    @JoinColumn(name = "studentId")
    @JsonManagedReference
    private Student student;
}

