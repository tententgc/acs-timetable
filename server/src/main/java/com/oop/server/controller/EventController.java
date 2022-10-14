package com.oop.server.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.oop.server.middleware.TokenHandler;
import com.oop.server.model.ColorModel;
import com.oop.server.model.EventModel;
import com.oop.server.model.UserModel;
import com.oop.server.repository.ColorRepository;
import com.oop.server.repository.EventRepository;
import com.oop.server.repository.UserRepository;
@CrossOrigin
@RestController
@RequestMapping(value = "/api/event", consumes = "application/json")
public class EventController {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ColorRepository colorRepository;

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> createEvent(@RequestHeader("Authorization") String bearerToken,
            @RequestBody EventModel req) {
        bearerToken = bearerToken.substring(7);
        Map<String, Object> res = new HashMap<String, Object>();

        try {
            DecodedJWT verify = new TokenHandler().verifyToken(bearerToken);
            String role = verify.getIssuer();
            String user_id = verify.getAudience().get(0);
            UserModel userModel = userRepository.findByUser_id(user_id);

            if (userModel == null) {
                res.put("status", 500);
                res.put("error", "cannot find users");
                return ResponseEntity.ok(res);
            } else {
                req.setUser(userModel);

                if (role.equals("USER") && userModel.getRole().equals("USER")) {
                    ColorModel colorModel = colorRepository.findByHex_code("CDF0EA");
                    if (colorModel != null) {
                        req.setColor(colorModel);
                    } else {
                        res.put("status", 500);
                        res.put("error", "cannot find color hex code");
                        return ResponseEntity.ok(res);
                    }
                } else if (role.equals("ADMIN") && userModel.getRole().equals("ADMIN")) {
                    ColorModel colorModel = colorRepository.findByHex_code(req.getColor().getHex_code());
                    req.setColor(colorModel);
                }
            }

            res.put("status", 200);
            res.put("data", eventRepository.saveEventModel(req.getEvent_id(), req.getHeader(), req.getDescription(), req.getEvent_date(), req.getTime_range(), LocalDateTime.now(), LocalDateTime.now(), req.getUser(), req.getColor()));

            return ResponseEntity.ok(res);

        } catch (Exception e) {
            res.put("status", 500);
            res.put("error", "Server error");
            return ResponseEntity.ok(res);
        }
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Map<String, Object>> updateEvent(@RequestHeader("Authorization") String bearerToken,
            @PathVariable String id, @RequestBody EventModel req) {
        Map<String, Object> res = new HashMap<String, Object>();
        bearerToken = bearerToken.substring(7);

        try {
            DecodedJWT verify = new TokenHandler().verifyToken(bearerToken);
            EventModel eventDB = eventRepository.findByEvent_id(id);
            String role = verify.getIssuer();
            if (eventDB == null) {
                res.put("status", 500);
                res.put("message", "cannot find id");
                return ResponseEntity.ok(res);
            }

            if(eventDB.getUser().getRole().equals("ADMIN") && role.equals("USER")){
                res.put("status", 500);
                res.put("message", "cannot update post");
                return ResponseEntity.ok(res);
            }

            eventRepository.updateEventModel(req.getEvent_id(), req.getHeader(), req.getDescription(), req.getEvent_date(), req.getTime_range(), LocalDateTime.now());
            res.put("status", 200);
            res.put("message", "your event have been updated");

            return ResponseEntity.ok(res);

        } catch (Exception e) {
            res.put("status", 500);
            res.put("error", "invalid token");
            return ResponseEntity.ok(res);
        }
    }

    @GetMapping(value = "/get/{date}")
    public ResponseEntity<Map<String, Object>> getEventById(@RequestHeader(value = "Authorization", defaultValue = "") String bearerToken,
            @PathVariable String date) {
        Map<String, Object> res = new HashMap<String, Object>();
        if(bearerToken.length() > 10) { // if user not login
            bearerToken = bearerToken.substring(7);
            try {
                DecodedJWT verify = new TokenHandler().verifyToken(bearerToken);
                List<EventModel> eventModel = eventRepository.findByDate(date, verify.getAudience().get(0));
                if (eventModel == null) {
                    res.put("status", 404);
                    List<EventModel> adminEvent = eventRepository.findAdminEvent(date);
                    res.put("data", adminEvent);
                    return ResponseEntity.ok(res);
                }
                
                res.put("status", 200);
                res.put("message", "user auth");
                res.put("data", eventModel);
                return ResponseEntity.ok(res);
            } catch (Exception e) { // check error token
                List<EventModel> adminEvent = eventRepository.findAdminEvent(date);
                res.put("status", 500);
                res.put("data", adminEvent);
                res.put("error", "invalid token");
                return ResponseEntity.ok(res);
            }
        } else {
            List<EventModel> adminEvent = eventRepository.findAdminEvent(date);
            res.put("status", 200);
            res.put("data", adminEvent);
            return ResponseEntity.ok(res);
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteEvent(@RequestHeader("Authorization") String bearerToken, @PathVariable String id) {
        bearerToken = bearerToken.substring(7);
        Map<String, Object> res = new HashMap<String, Object>();
        try {
            DecodedJWT verify = new TokenHandler().verifyToken(bearerToken);
            EventModel eventDB = eventRepository.findByEvent_id(id);
            String role = verify.getIssuer();


            if(eventDB.getUser().getRole().equals("ADMIN") && role.equals("USER")){
                res.put("status", 500);
                res.put("message", "cannot delete admin post");
                return ResponseEntity.ok(res);
            }

            eventRepository.deleteEventModel(id);
            res.put("status", 200);
            res.put("message", "delete successfully");
            return ResponseEntity.ok(res);

        } catch (Exception e) {
            res.put("status", 500);
            res.put("message", "server error");
            
            return ResponseEntity.ok(res);
        }
    }
}
