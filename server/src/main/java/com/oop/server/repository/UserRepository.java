package com.oop.server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.oop.server.model.UserModel;

public interface UserRepository extends CrudRepository<UserModel, String> {
    
    @Query(value = "select * from users where email = :email", nativeQuery = true)
    UserModel findByEmail(@Param("email") String email);
}
