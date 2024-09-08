package com.example.SCHMGMT_SVR.models;

import com.example.SCHMGMT_SVR.models.base.BaseModel;
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

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "feedback")
public class FeedBack extends BaseModel {

    @Column(name = "comments", length = 255)
    private String comments;

    @Column(name = "rating", nullable = false)
    private int rating;

    @ManyToOne
    @JoinColumn(name = "studentId")
    @JsonManagedReference
    private Student student;

    @ManyToOne
    @JoinColumn(name = "teacherId")
    @JsonManagedReference
    private Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "courseId")
    @JsonManagedReference
    private Course course;
}
