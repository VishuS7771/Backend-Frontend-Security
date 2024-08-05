package com.mas.ems.service.impl;

import com.mas.ems.entity.UserType;
import com.mas.ems.repository.UserTypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserTypeServiceImpl {

    @Autowired
    public UserTypeRepo userTypeRepo;

    public List<UserType> getAllUserType() {

        return userTypeRepo.findAll();
    }
}
