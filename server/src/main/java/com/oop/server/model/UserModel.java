package com.oop.server.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

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
@Table(name = "users")
public class UserModel {

    @Id
    private String user_id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime create_at;

    @UpdateTimestamp
    @Column
    private LocalDateTime update_at;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.MERGE)
    private List<EventModel> eventModels;

    public UserModel() {
        this.user_id = UUID.randomUUID().toString();
    }
}
