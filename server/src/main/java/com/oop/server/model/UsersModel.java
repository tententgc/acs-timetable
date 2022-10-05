package com.oop.server.model;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "Users")
public class UsersModel {
    
    @Id
    private String user_id;
    
    @Column(nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String email;

    @Column
    private LocalDateTime create_at;

    @Column
    private LocalDateTime update_at;

    public UsersModel() {
        this.user_id = UUID.randomUUID().toString();
        this.create_at = LocalDateTime.now();
        this.update_at = LocalDateTime.now();
    }
}
