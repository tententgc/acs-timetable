package com.oop.server.repository;

import java.time.LocalDateTime;
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

    @Query(value = "insert into colors(hex_code, color_meaning, create_at, update_at) values(:hex_code, :color_meaning, :create_at, :update_at) returning *", nativeQuery = true)
    ColorModel saveColorModel(@Param("hex_code") String hex_code, @Param("color_meaning") String color_meaning, @Param("create_at") LocalDateTime create_at, @Param("update_at") LocalDateTime update_at);

    @Query(value = "update colors set color_meaning=:color_meaning, create_at=:create_at, update_at=:update_at where hex_code=:hex_code returning *", nativeQuery = true)
    ColorModel updateColorModel(@Param("hex_code") String hex_code, @Param("color_meaning") String color_meaning, @Param("update_at") LocalDateTime update_at);
}
