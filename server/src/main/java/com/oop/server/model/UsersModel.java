package com.oop.server.model;

import java.time.LocalDateTime;

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
    private String user_email;

    @Column(nullable = false)
    private String user_name;

    @Column(nullable = false)
    private String user_password;

    @Column
    private LocalDateTime create_at;

    @Column
    private LocalDateTime update_at;

    public UsersModel() {
        this.create_at = LocalDateTime.now();
        this.update_at = LocalDateTime.now();
    }
}
