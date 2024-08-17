package com.mas.ems.service.impl;

import com.mas.ems.entity.Department;
import com.mas.ems.repository.DepartmentRepo;
import com.mas.ems.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepo departmentRepo;

    @Override
    public List<Department> getAllDepartment(){
        return departmentRepo.findAll();
    }
}
