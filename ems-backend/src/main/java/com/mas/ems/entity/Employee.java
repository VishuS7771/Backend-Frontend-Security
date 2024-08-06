package com.mas.ems.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Tbl_employees",schema = "appemployee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long empId;

    private String name;

    @ManyToOne
    @JoinColumn(name = "designationId")
    private Designation designation;

    private String email;

    private String mobileNo;

    @ManyToOne
    @JoinColumn(name = "departmentId")
    private Department department;

    @ManyToOne
    @JoinColumn(name = "userTypeId")
    private UserType userType;

    private String dateOfJoining;

    private String dateOfBirth;

    private String currentAddress;

    private String permanentAddress;

    private String state;

    private String branch;

    private String product;


    private String manager;

    private String hrManager;

    private String payrollManager;

    private String password;

    public Employee(Long empId, String name, Designation designation, String email, String mobileNo, UserType userType, Department department, Object o, String  dateOfJoining, String  dateOfBirth, String currentAddress, String permanentAddress, String state, String branch, String product, String manager, String hrManager, String payrollManager) {
    }

    public Employee(Long empId) {
    }
}
