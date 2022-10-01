package com.oop.server.repository;

import org.springframework.data.repository.CrudRepository;

import com.oop.server.model.UsersModel;

public interface UserRepository extends CrudRepository<UsersModel, String> {
    
}
