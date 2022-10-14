package com.oop.server.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "colors")
public class ColorModel {
    @Id
    private String hex_code;

    @Column(nullable = false)
    private String color_meaning;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime create_at;

    @Column
    @UpdateTimestamp
    private LocalDateTime update_at;

    @JsonIgnore
    @OneToMany(mappedBy = "color", cascade = CascadeType.MERGE)
    private List<EventModel> eventModels;
}
