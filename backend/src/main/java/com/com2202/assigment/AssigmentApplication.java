package com.com2202.assigment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@ComponentScan(basePackages = "com.com2202.assigment.*")
@EntityScan(basePackages = "com.com2202.assigment.*")
@ConfigurationPropertiesScan(basePackages = "com.com2202.assigment.*")

public class AssigmentApplication {

    public static void main(String[] args) {
        SpringApplication.run(AssigmentApplication.class, args);
    }

}
