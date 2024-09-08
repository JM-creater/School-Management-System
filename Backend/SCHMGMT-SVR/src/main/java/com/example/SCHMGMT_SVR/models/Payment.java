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

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "payment")
public class Payment extends BaseModel {

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "paymentDate", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate paymentDate;

    @Column(name = "paymentMethod", nullable = false, length = 50)
    private String paymentMethod;

    @Column(name = "status", nullable = false, length = 50)
    private String status;

    @ManyToOne
    @JoinColumn(name = "studentId")
    @JsonManagedReference
    private Student student;
}

