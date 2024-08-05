package com.mas.ems.service.impl;

import com.mas.ems.entity.Designation;
import com.mas.ems.repository.DesignationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DesignationServiceImpl {

    @Autowired
    private DesignationRepository designationRepository;


    public List<Designation> getAllDesignations(long departmentId){

        return designationRepository.findByDepartmentId(departmentId);
    }
}
