package com.mas.ems.repository;



import com.mas.ems.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {


    @Query(value = "select * from appemployee.Tbl_attendance where  emp_Id=:empId",nativeQuery = true)
    List<Attendance> findByEmpId( @Param("empId")Long empId);

    @Query(value = "select * from appemployee.Tbl_attendance where date=:date and emp_Id=:empId",nativeQuery = true)
    Attendance findByDateAndUserId(@Param("date") Date date, @Param("empId") long empId);

    @Query("SELECT a FROM Attendance a WHERE a.employee.empId = :empId AND EXTRACT(YEAR FROM a.date) = :year AND EXTRACT(MONTH FROM a.date) = :month")
    List<Attendance> findByEmpIddAndMonth(@Param("empId") Long empId, @Param("year") int year, @Param("month") int month);


}

