package com.oop.server.repository;

import org.springframework.data.repository.CrudRepository;

import com.oop.server.model.ColorModel;

public interface ColorRepository extends CrudRepository<ColorModel, String>{
    
}
