package com.mas.ems.service.impl;

import com.mas.ems.entity.UserType;
import com.mas.ems.repository.UserTypeRepo;
import com.mas.ems.service.UserTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserTypeServiceImpl implements UserTypeService {

    @Autowired
    public UserTypeRepo userTypeRepo;

    @Override
    public List<UserType> getAllUserType() {

        return userTypeRepo.findAll();
    }
}
