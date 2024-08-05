package com.mas.ems.controller;

import com.mas.ems.entity.Designation;
import com.mas.ems.service.impl.DesignationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/designation")
public class DesignationController {

    @Autowired
    private DesignationServiceImpl designationService;

    @GetMapping("/getdeslist/{departmentId}")
    public List<Designation> getAllDesignations(@PathVariable("departmentId") long departmentId){
        return designationService.getAllDesignations(departmentId);
    }
}
