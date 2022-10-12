package com.oop.server.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.oop.server.middleware.TokenHandler;
import com.oop.server.model.UserModel;
import com.oop.server.repository.UserRepository;
import com.oop.server.secret.SecretKeyENV;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/auth", consumes = "application/json")
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @GetMapping(value = "/get")
    public ResponseEntity<Iterable<UserModel>> Test() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping(value = "/verify")
    public ResponseEntity<Map<String, Object>> verifyToken(@RequestHeader("Authorization") String bearerToken) {
        Map<String, Object> res = new HashMap<String, Object>();
        if(bearerToken.length() > 10){
            bearerToken = bearerToken.substring(7);
            try {
                DecodedJWT verfily = new TokenHandler().verifyToken(bearerToken);
                res.put("status", 200);
                res.put("role", verfily.getIssuer());
                res.put("message", "valid token");
                return ResponseEntity.ok(res);
            } catch (Exception e) {
                res.put("status", 400);
                res.put("message", "invalid token or expired token");
                return ResponseEntity.ok(res);
            }
        }else {
            res.put("status", 400);
            res.put("message", "itoken error");
            return ResponseEntity.ok(res);
        }
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<Map<String, Object>> SignUp(
            @RequestHeader(value = "Authorization", defaultValue = "") String bearerToken, @RequestBody UserModel req) {
        if (bearerToken.length() > 7) {
            bearerToken = bearerToken.substring(7);
        }
        UserModel check = userRepository.findByEmail(req.getEmail());
        Map<String, Object> res = new HashMap<String, Object>();
        req.setPassword(bCryptPasswordEncoder().encode(req.getPassword())); // bcrypt password

        if (bearerToken.equals(SecretKeyENV.adminKey)) {
            req.setRole("ADMIN");
        } else {
            req.setRole("USER");
        }

        if (check != null) {
            res.put("status", 409);
            res.put("error", "email already in use");
            return ResponseEntity.ok(res);
        }

        UserModel response = userRepository.save(req);

        res.put("status", 201);
        res.put("data", response);

        return ResponseEntity.ok(res);
    }

    @PostMapping(value = "/signin")
    public ResponseEntity<Map<String, Object>> SignIn(@RequestBody UserModel req) {
        UserModel res = userRepository.findByEmail(req.getEmail());
        Map<String, Object> response = new HashMap<String, Object>();

        if (res == null) {
            response.put("status", 404);
            response.put("error", "Cannot find Email");
            return ResponseEntity.ok(response);
        }

        Boolean decodePassword = bCryptPasswordEncoder().matches(req.getPassword(), res.getPassword());

        if (!decodePassword) {
            response.put("status", 404);
            response.put("error", "password doesn't match");
            return ResponseEntity.ok(response);
        }

        String token;

        if (res.getRole().equals("ADMIN")) {
            token = new TokenHandler().generateToken(res.getEmail(), "ADMIN", res.getUser_id());
        } else {
            token = new TokenHandler().generateToken(res.getEmail(), "USER",res.getUser_id());
        }

        response.put("status", 200);
        response.put("token", token);
        response.put("role", res.getRole());
        response.put("data", res);

        return ResponseEntity.ok(response);
    }
}