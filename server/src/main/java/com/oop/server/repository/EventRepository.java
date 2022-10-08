package com.oop.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.oop.server.model.EventModel;

public interface EventRepository extends CrudRepository<EventModel, String>{

    @Query(value = "select * from events as e inner join users as u on u.user_id = e.user_id where e.date like %:date% and (u.email = :email or u.role = 'ADMIN')", nativeQuery = true)
    List<EventModel> findByDate(@Param("date") String date, @Param("email") String email);
}
