package com.mas.ems.service;

import com.mas.ems.dto.EmployeeDto;

import javax.mail.MessagingException;
import java.text.ParseException;
import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto) throws MessagingException;

    EmployeeDto getEmployeeById(Long employeeId);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee);

    void deleteEmployee(Long employeeId);


}
