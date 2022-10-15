package com.oop.server.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.oop.server.model.ColorModel;
import com.oop.server.model.EventModel;
import com.oop.server.model.UserModel;

public interface EventRepository extends CrudRepository<EventModel, String>{

    @Query(value = "select * from events as e inner join users as u on u.user_id = e.user_id inner join colors as c on c.hex_code = e.hex_code where e.event_date like %:date% and (u.user_id = :user_id or u.role = 'ADMIN') order by c.hex_code", nativeQuery = true)
    List<EventModel> findByDate(@Param("date") String date, @Param("user_id") String user_id);

    @Query(value = "select * from events as e inner join users as u on u.user_id = e.user_id inner join colors as c on c.hex_code = e.hex_code where e.event_date like %:date% and u.role = 'ADMIN' order by c.hex_code", nativeQuery = true)
    List<EventModel> findAdminEvent(@Param("date") String date);

    @Query(value = "select * from events as e where e.event_id = :id", nativeQuery = true)
    EventModel findByEvent_id(@Param("id") String id);

    @Query(value = "insert into events(event_id, header, description, event_date, time_range, create_at, update_at, user_id, hex_code) values(:event_id, :header, :description, :event_date, :time_range, :create_at, :update_at, :user_id, :hex_code) returning *", nativeQuery = true)
    EventModel saveEventModel(@Param("event_id") String event_id, @Param("header") String header, @Param("description") String description, @Param("event_date") String event_date, @Param("time_range") String time_range, @Param("create_at") LocalDateTime create_at, @Param("update_at") LocalDateTime update_at, @Param("user_id") UserModel user_id, @Param("hex_code") ColorModel hex_code);

    @Query(value = "update events set header=:header ,description=:description, event_date=:event_date, time_range=:time_range, update_at=:update_at where event_id=:event_id returning *", nativeQuery = true)
    EventModel updateEventModel(@Param("event_id") String event_id, @Param("header") String header, @Param("description") String description, @Param("event_date") String event_date, @Param("time_range") String time_range, @Param("update_at") LocalDateTime update_at);

    @Query(value = "delete from events where event_id=:event_id returning *", nativeQuery = true)
    EventModel deleteEventModel(@Param("event_id") String event_id);
}
