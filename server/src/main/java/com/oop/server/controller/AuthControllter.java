package com.oop.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oop.server.model.UsersModel;
import com.oop.server.repository.UserRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
public class AuthControllter {

    @Autowired
    UserRepository userRepository;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @GetMapping("/test")
    public ResponseEntity<Iterable<UsersModel>> Test() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PostMapping("/signup")
    public ResponseEntity<UsersModel> SignUp(@RequestBody UsersModel req) {
        UsersModel check = userRepository.findById(req.getUser_email()).orElse(null);
        if(check != null) {
            return new ResponseEntity<UsersModel>(req, null, 500);
        }

        req.setUser_password(bCryptPasswordEncoder().encode(req.getUser_password())); //bcrypt password

        userRepository.save(req);

        return ResponseEntity.ok(req);
    }

    @PostMapping(value = "/signin")
    public ResponseEntity<UsersModel> SignIn(@RequestBody UsersModel req) {
        UsersModel res = userRepository.findById(req.getUser_email()).orElse(null);

        if (res == null) {
            return new ResponseEntity<UsersModel>(req, null, 404);
        }

        Boolean decodePassword = bCryptPasswordEncoder().matches(req.getUser_password(), res.getUser_password());

        if (!decodePassword) {
            return new ResponseEntity<UsersModel>(req, null, 404);
        }

        return ResponseEntity.ok(res);
    }
}