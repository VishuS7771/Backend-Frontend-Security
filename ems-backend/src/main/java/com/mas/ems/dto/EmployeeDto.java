package com.mas.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {

    private Long empId;

    private String name;

    private long designationId;

    private String email;

    private String mobileNo;

    private long userTypeId;

    private String currentAddress;

    private String permanentAddress;

    private long departmentId;

    private String dateOfJoining;

    private String  dateOfBirth;

    private String state;

    private String branch;

    private String product;

    private String manager;

    private String hrManager;

    private String payrollManager;
}
