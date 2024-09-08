package com.example.SCHMGMT_SVR.models;

import com.example.SCHMGMT_SVR.models.base.BaseModel;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

import java.time.LocalDate;
import java.util.Set;

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

    @Column(name = "middleName", length = 100)
    private String middleName;

    @Column(name = "dateOfBirth", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    @Column(name = "gender", length = 10)
    private String gender;

    @Column(name = "address", length = 100)
    private String address;

    @Column(name = "city", length = 100)
    private String city;

    @Column(name = "province", length = 100)
    private String province;

    @Column(name = "zipcode", length = 10)
    private String zipcode;

    @Column(name = "country", length = 100)
    private String country;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "phoneNumber", length = 100)
    private String phoneNumber;

    @Column(name = "status", length = 100)
    private String status;

    @JsonProperty(value = "isAttendance")
    private boolean isAttendance;

    @Column(name = "enrollmentDate", nullable = false)
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

    @ManyToMany(
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            }, fetch = FetchType.LAZY
    )
    @JoinTable(
            name = "student_course",
            joinColumns = @JoinColumn(name = "studentId"),
            inverseJoinColumns = @JoinColumn(name = "courseId")
    )
    @JsonBackReference
    private Set<Course> courses;

    @OneToMany(
            mappedBy = "student",
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            }, fetch = FetchType.LAZY
    )
    @JsonBackReference
    private Set<Payment> payments;

    @OneToMany(
                    mappedBy = "student",
                    cascade = {
                            CascadeType.PERSIST,
                            CascadeType.MERGE
                    }, fetch = FetchType.LAZY
    )
    @JsonBackReference
    private Set<Exam> exams;

    @OneToMany(
            mappedBy = "student",
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            }, fetch = FetchType.LAZY
    )
    @JsonBackReference
    private Set<FeedBack> feedbacks;
}
