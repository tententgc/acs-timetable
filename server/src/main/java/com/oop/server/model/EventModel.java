package com.oop.server.model;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "events")
public class EventModel {

    @Id
    private String event_id;

    @Column(nullable = false)
    private String header;

    @Column
    private String description;

    @Column(nullable = false)
    private String event_date;

    @Column
    private String time_range;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime create_at;

    @Column
    @UpdateTimestamp
    private LocalDateTime update_at;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private UserModel user;

    @ManyToOne
    @JoinColumn(name = "hex_code", nullable = false)
    private ColorModel color;
    

    public EventModel() {
        this.event_id = UUID.randomUUID().toString();
    }

    public void setDate(String d) {
        this.event_date = d.toString();
    }
}
