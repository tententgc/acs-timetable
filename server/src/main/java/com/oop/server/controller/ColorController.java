package com.oop.server.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oop.server.middleware.TokenHandler;
import com.oop.server.model.ColorModel;
import com.oop.server.repository.ColorRepository;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/colors", consumes = "application/json")
public class ColorController {

    @Autowired
    ColorRepository colorRepository;

    @GetMapping("/get")
    public ResponseEntity<Iterable<ColorModel>> getAllColors() {
        return ResponseEntity.ok(colorRepository.findAllColor());
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Map<String, Object>> createColors(@RequestHeader("Authorization") String bearerToken,
            @RequestBody List<ColorModel> req) {
        bearerToken = bearerToken.substring(7);

        Map<String, Object> res = new HashMap<String, Object>();
        try {
            boolean isAdmin = new TokenHandler().isAdmin(bearerToken);
            if (isAdmin) {
                for (ColorModel colorModel : req) {
                    colorRepository.saveColorModel(colorModel.getHex_code(), colorModel.getColor_meaning(), LocalDateTime.now(), LocalDateTime.now());
                }
                res.put("status", 200);
                return ResponseEntity.ok(res);
            } else {
                res.put("status", 404);
                res.put("error", "only admin can use this function");
                return ResponseEntity.ok(res);
            }
        } catch (Exception e) {
            res.put("status", 200);
            res.put("error", "verify token");
            return ResponseEntity.ok(res);
        }
    }

    @PutMapping(value = "/update/{id}") //auth
    public ResponseEntity<Map<String, Object>> updateColors(@PathVariable String id, @RequestBody ColorModel req) {
        Map<String, Object> res = new HashMap<String, Object>();
        ColorModel colorDB = colorRepository.findByHex_code(id);
        if(colorDB == null){
            res.put("status", 500);
            res.put("error", "error cannot find id");
            return ResponseEntity.ok(res);
        }

        colorDB.setColor_meaning(req.getColor_meaning());

        res.put("status", 200);
        res.put("data", colorRepository.saveColorModel(colorDB.getHex_code(), colorDB.getColor_meaning(), colorDB.getCreate_at(), LocalDateTime.now()));

        return ResponseEntity.ok(res);
    }
}
