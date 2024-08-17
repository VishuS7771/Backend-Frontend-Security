package com.mas.ems.service;

import com.mas.ems.entity.Designation;

import java.util.List;

public interface DesignationService {

    public List<Designation> getAllDesignations(long departmentId);

}
