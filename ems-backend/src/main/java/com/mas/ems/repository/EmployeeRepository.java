package com.mas.ems.repository;

import com.mas.ems.entity.Employee;
import com.mas.ems.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface EmployeeRepository extends JpaRepository<Employee, Long> {


    @Query(value = "select * from appemployee.Tbl_employees where email=:email",nativeQuery = true)
    Optional<Employee> findByEmailId(@Param("email") String email);
}
