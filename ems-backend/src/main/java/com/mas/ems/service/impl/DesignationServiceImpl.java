package com.mas.ems.service.impl;

import com.mas.ems.entity.Designation;
import com.mas.ems.repository.DesignationRepository;
import com.mas.ems.service.DesignationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DesignationServiceImpl implements DesignationService {

    @Autowired
    private DesignationRepository designationRepository;


    @Override
    public List<Designation> getAllDesignations(long departmentId){

        return designationRepository.findByDepartmentId(departmentId);
    }
}
