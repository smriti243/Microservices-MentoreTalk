package com.mentoretalk.userService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
// import org.springframework.cloud.cl
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;  // Use EnableDiscoveryClient
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


// @EnableEurekaClient
@EnableDiscoveryClient  // Enable Eureka Client using this annotation
@EnableFeignClients(basePackages = "com.mentoretalk.client")
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    HibernateJpaAutoConfiguration.class
})
@ComponentScan(basePackages = "com.mentoretalk")
@EnableMongoRepositories(basePackages = "com.mentoretalk")
public class UserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
