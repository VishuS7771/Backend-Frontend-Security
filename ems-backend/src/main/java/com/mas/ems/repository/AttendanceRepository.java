package com.mas.ems.repository;



import com.mas.ems.entity.Attendance;
import lombok.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {


    @Query(value = "select * from appemployee.Tbl_attendance where  user_id=:userId",nativeQuery = true)
    Attendance findByUserId( @Param("userId")Long userId);

    @Query(value = "select * from appemployee.Tbl_attendance where date=:date and user_id=:userId",nativeQuery = true)
    Attendance findByDateAndUserId(@Param("date") Date date, @Param("userId") long userId);

}

