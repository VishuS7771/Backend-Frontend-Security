package com.mas.ems.service.impl;

import com.mas.ems.service.EmployeeService;
import com.mas.ems.util.MailConfig;
import lombok.AllArgsConstructor;
import com.mas.ems.dto.EmployeeDto;
import com.mas.ems.entity.Employee;
import com.mas.ems.exception.ResourceNotFoundException;
import com.mas.ems.mapper.EmployeeMapper;
import com.mas.ems.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.text.ParseException;
import java.util.List;
import java.util.stream.Collectors;

import static com.mas.ems.util.PasswordGenerator.generatePassword;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MailConfig mailConfig;


    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) throws MessagingException {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        String password=generatePassword();
        employee.setPassword(passwordEncoder.encode(password));
        Employee savedEmployee = employeeRepository.save(employee);
       // mailConfig.sendSimpleMessage(savedEmployee.getEmail(),savedEmployee.getEmail(),password);
        EmployeeDto employeeDto1=EmployeeMapper.mapToEmployeeDto(savedEmployee );
        employeeDto1.setPassword(password);
        return employeeDto1;
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(()
                -> new ResourceNotFoundException("Employee is not exists with given id : " + employeeId,"200"));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map(EmployeeMapper::mapToEmployeeDto).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {

        Employee employee = employeeRepository.findById(employeeId).orElseThrow(()
                -> new ResourceNotFoundException("Employee is not exists with given id: " + employeeId,"400"));

         employee = EmployeeMapper.mapToEmployee(updatedEmployee);
        Employee updatedEmployeeObj = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId).orElseThrow(()
                -> new ResourceNotFoundException("Employee is not exists with given i d: " + employeeId,"400"));

        employeeRepository.deleteById(employeeId);
    }

}
