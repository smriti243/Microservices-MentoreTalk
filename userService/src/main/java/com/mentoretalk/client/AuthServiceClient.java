package com.mentoretalk.client;
import com.mentoretalk.dto.LoginRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.stereotype.Component;

@Component
@FeignClient(name = "AUTH-SERVICE")
public interface AuthServiceClient {

    @PostMapping("/api/auth/login")
    String login(@RequestBody LoginRequest loginRequest);
}


