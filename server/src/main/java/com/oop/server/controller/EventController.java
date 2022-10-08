package com.oop.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

@RestController
@RequestMapping("/api/event")
public class EventController {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ColorRepository colorRepository;

    @GetMapping("/get")
    public Iterable<EventModel> getAllEvent() {
        return eventRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> createEvent(@RequestHeader("Authorization") String bearerToken,
            @RequestBody EventModel req) {
        bearerToken = bearerToken.substring(7);
        Map<String, Object> res = new HashMap<String, Object>();

        try {
            DecodedJWT verify = new TokenHandler().verifyToken(bearerToken);
            String email = verify.getSubject();
            String role = verify.getIssuer();
            UserModel userModel = userRepository.findByEmail(email);

            if (userModel == null) {
                res.put("status", 500);
                res.put("error", "cannot find users");
                return new ResponseEntity<Map<String, Object>>(res, null, 500);
            } else {
                req.setUser(userModel);

                if (role.equals("USER")) {
                    ColorModel colorModel = colorRepository.findById("CDF0EA").orElse(null);
                    if (colorModel != null) {
                        req.setColor(colorModel);
                    } else {
                        res.put("status", 500);
                        res.put("error", "cannot find color hex code");
                        return new ResponseEntity<Map<String, Object>>(res, null, 500);
                    }
                } else if (role.equals("ADMIN")) {
                    ColorModel colorModel = colorRepository.findById(req.getColor().getHex_code()).orElse(null);
                    req.setColor(colorModel);
                }
            }

            res.put("status", 200);
            res.put("data", eventRepository.save(req));

            return ResponseEntity.ok(res);

        } catch (Exception e) {
            res.put("status", 500);
            res.put("error", "Server error");
            return new ResponseEntity<Map<String, Object>>(res, null, 500);
        }
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Map<String, Object>> updateEvent(@RequestHeader("Authorization") String bearerToken,
            @PathVariable String id, @RequestBody EventModel req) {
        Map<String, Object> res = new HashMap<String, Object>();
        bearerToken = bearerToken.substring(7);

        try {
            new TokenHandler().verifyToken(bearerToken);
            EventModel eventDB = eventRepository.findById(id).orElse(null);
            if (eventDB == null) {
                res.put("status", 500);
                res.put("error", "cannot find id");
                return new ResponseEntity<Map<String, Object>>(res, null, 200);
            }

            eventDB.setHeader(req.getHeader());
            eventDB.setDate(req.getDate());
            eventDB.setDescription(req.getDescription());
            eventDB.setTime_range(req.getTime_range());
            res.put("status", 200);
            res.put("data", eventRepository.save(eventDB));

            return new ResponseEntity<Map<String, Object>>(res, null, 200);

        } catch (Exception e) {
            res.put("status", 500);
            res.put("error", "invalid token");
            return new ResponseEntity<Map<String, Object>>(res, null, 500);
        }
    }

    @GetMapping(value = "/get/{date}")
    public ResponseEntity<Map<String, Object>> getEventById(@RequestHeader("Authorization") String bearerToken,
            @PathVariable String date) {
        Map<String, Object> res = new HashMap<String, Object>();
        bearerToken = bearerToken.substring(7);
        try {
            DecodedJWT verify = new TokenHandler().verifyToken(bearerToken);
            String email = verify.getSubject();
            List<EventModel> eventModel = eventRepository.findByDate(date, email);
            if (eventModel == null) {
                res.put("status", 404);
                return new ResponseEntity<Map<String, Object>>(res, null, 404);
            }
            res.put("status", 200);
            res.put("data", eventModel);
            return new ResponseEntity<Map<String, Object>>(res, null, 200);
        } catch (Exception e) {
            res.put("status", 500);
            res.put("error", "invalid token");
            return new ResponseEntity<Map<String, Object>>(res, null, 500);
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteEvent(@PathVariable String id) {
        Map<String, Object> res = new HashMap<String, Object>();

        EventModel eventDB = eventRepository.findById(id).orElse(null);

        if(eventDB.getUser().getRole().equals("USER") && eventDB != null) {
            eventRepository.deleteById(id);
            res.put("status", 200);
            return new ResponseEntity<Map<String, Object>>(res, null, 200);
        }
        res.put("status", 404);
        res.put("error", "cannot find event");

        return null;
    }
}
