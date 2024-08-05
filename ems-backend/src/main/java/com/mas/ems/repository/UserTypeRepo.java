package com.mas.ems.repository;

import com.mas.ems.entity.UserType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTypeRepo extends JpaRepository<UserType,Long> {
}
