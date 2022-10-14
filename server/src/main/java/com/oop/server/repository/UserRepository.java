package com.oop.server.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.oop.server.model.UserModel;

public interface UserRepository extends CrudRepository<UserModel, String> {
    
    @Query(value = "select * from users where user_id = :user_id", nativeQuery = true)
    UserModel findByUser_id(@Param("user_id") String user_id);

    @Query(value = "select * from users where email = :email", nativeQuery = true)
    UserModel findByEmail(@Param("email") String email);

    @Query(value = "insert into users(user_id, email, username, password, role, create_at, update_at) values(:user_id, :email, :username, :password, :role, :create_at, :update_at) returning *", nativeQuery = true)
    UserModel saveModel(@Param("user_id") String user_id, @Param("email") String email, @Param("username") String username, @Param("password") String password, @Param("role") String role, @Param("create_at") LocalDateTime create_at, @Param("update_at") LocalDateTime update_at);
}
