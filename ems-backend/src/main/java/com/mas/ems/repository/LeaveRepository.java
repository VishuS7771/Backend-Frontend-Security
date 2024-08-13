package com.mas.ems.repository;

import com.mas.ems.entity.Leave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRepository extends JpaRepository<Leave, Long> {

    @Query(value = "select * from appemployee.Tbl_leave where emp_Id=:empId",nativeQuery = true)
    List<Leave> findByEmpId(@Param("empId") Long empId);
}
