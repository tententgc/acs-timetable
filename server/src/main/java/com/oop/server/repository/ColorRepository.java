package com.oop.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.oop.server.model.ColorModel;

public interface ColorRepository extends CrudRepository<ColorModel, String> {
    @Query(value = "select * from colors", nativeQuery = true)
    List<ColorModel> findAllColor();


    @Query(value = "select * from colors where hex_code = :hex_code", nativeQuery = true)
    ColorModel findByHex_code(@Param("hex_code") String hex_code);
}
