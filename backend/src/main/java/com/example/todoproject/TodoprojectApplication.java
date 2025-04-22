package com.example.todoproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.todoproject.repository")
@EnableCaching
public class TodoprojectApplication {
    public static void main(String[] args) {
        SpringApplication.run(TodoprojectApplication.class, args);
    }
}