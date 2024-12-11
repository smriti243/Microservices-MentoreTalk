package com.mentoretalk.authService;
// import com.mentoretalk.util.JwtUtil;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;  // Use EnableDiscoveryClient
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableDiscoveryClient  // Enable Eureka Client using this annotation
@EnableFeignClients
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    HibernateJpaAutoConfiguration.class
})
@ComponentScan(basePackages = "com.mentoretalk")
@EnableMongoRepositories(basePackages = "com.mentoretalk")
public class AuthenticateServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(AuthenticateServiceApplication.class, args);
    }
}
