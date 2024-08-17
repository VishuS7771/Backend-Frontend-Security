package com.mas.ems.controller;


import com.mas.ems.entity.UserType;
import com.mas.ems.service.UserTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/usertype")
public class UserTypeController {

    @Autowired
    private UserTypeService userTypeService;

    @GetMapping("/getall")
    public List<UserType> getUserType(){
        return userTypeService.getAllUserType();
    }
}
