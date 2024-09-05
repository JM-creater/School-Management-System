package com.example.SCHMGMT_SVR.models;

import com.example.SCHMGMT_SVR.models.base.BaseModel;
import com.example.SCHMGMT_SVR.models.enums.UserStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
public class User extends BaseModel {

    @Column(name = "firstName", length = 100)
    private String firstName;

    @Column(name = "middleName", length = 100)
    private String middleName;

    @Column(name = "lastName", length = 100)
    private String lastName;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

}
