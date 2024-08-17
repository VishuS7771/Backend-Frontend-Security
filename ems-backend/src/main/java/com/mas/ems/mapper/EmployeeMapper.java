package com.mas.ems.mapper;


import com.mas.ems.entity.Designation;
import com.mas.ems.entity.Employee;
import com.mas.ems.dto.EmployeeDto;
import com.mas.ems.exception.ResourceNotFoundException;
import com.mas.ems.repository.DepartmentRepo;
import com.mas.ems.repository.DesignationRepository;
import com.mas.ems.repository.UserTypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;


@Configuration
public class EmployeeMapper {

    @Autowired
    private  DesignationRepository designationRepository;

    @Autowired
    private  DepartmentRepo departmentRepo;

    @Autowired
    private  UserTypeRepo userTypeRepo;

    public  EmployeeDto mapToEmployeeDto(Employee employee ) {
        if (employee == null) {
            return null;
        }
        EmployeeDto employeeDto = new EmployeeDto();
        employeeDto.setEmpId(employee.getEmpId());
        employeeDto.setName(employee.getName());
        employeeDto.setDesignationId(employee.getDesignation() != null ? employee.getDesignation().getDesignationId() : null);
        employeeDto.setEmail(employee.getEmail());
        employeeDto.setMobileNo(employee.getMobileNo());
        employeeDto.setUserTypeId(employee.getUserType() != null ? employee.getUserType().getUserTypeId() : null);
        employeeDto.setCurrentAddress(employee.getCurrentAddress());
        employeeDto.setPermanentAddress(employee.getPermanentAddress());
        employeeDto.setDepartmentId(employee.getDepartment() != null ? employee.getDepartment().getDepartmentId() : null);
        employeeDto.setDateOfJoining(employee.getDateOfJoining());
        employeeDto.setDateOfBirth(employee.getDateOfBirth());
        employeeDto.setState(employee.getState());
        employeeDto.setBranch(employee.getBranch());
        employeeDto.setProduct(employee.getProduct());
        employeeDto.setManager(employee.getManager());
        employeeDto.setHrManager(employee.getHrManager());
        employeeDto.setPayrollManager(employee.getPayrollManager());
        return employeeDto;
    }

    public  Employee mapToEmployee(EmployeeDto employeeDto) {
        if (employeeDto == null) {
            return null;
        }
        Employee employee = new Employee();
        employee.setEmpId(employeeDto.getEmpId());
        employee.setName(employeeDto.getName());
        Designation designation1=designationRepository.findById(employeeDto.getDesignationId()).orElseThrow(() ->new ResourceNotFoundException("Designation not found with designationId"+employeeDto.getDesignationId(),"404"));
        employee.setDesignation(designation1);
        employee.setEmail(employeeDto.getEmail());
        employee.setMobileNo(employeeDto.getMobileNo());
        employee.setUserType(userTypeRepo.findById(employeeDto.getUserTypeId()).orElseThrow(() ->new ResourceNotFoundException("usertype not found with userTypeId"+employeeDto.getUserTypeId(),"404")));
        employee.setDepartment(departmentRepo.findById(employeeDto.getDepartmentId()).orElseThrow(() ->new ResourceNotFoundException("department not found with departmentId"+employeeDto.getDepartmentId(),"404")));
        employee.setDateOfJoining(employeeDto.getDateOfJoining());
        employee.setDateOfBirth(employeeDto.getDateOfBirth());
        employee.setCurrentAddress(employeeDto.getCurrentAddress());
        employee.setPermanentAddress(employeeDto.getPermanentAddress());
        employee.setState(employeeDto.getState());
        employee.setBranch(employeeDto.getBranch());
        employee.setProduct(employeeDto.getProduct());
        employee.setManager(employeeDto.getManager());
        employee.setHrManager(employeeDto.getHrManager());
        employee.setPayrollManager(employeeDto.getPayrollManager());
        return employee;
    }

}
