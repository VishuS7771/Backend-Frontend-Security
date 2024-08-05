package com.mas.ems.repository;

import com.mas.ems.entity.Designation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DesignationRepository extends JpaRepository<Designation,Long> {

    @Query(value = "SELECT * FROM appmaster.Tbl_Designation WHERE department_Id = :departmentId", nativeQuery = true)
    List<Designation> findByDepartmentId(@Param("departmentId") long departmentId);


}
