package com.mentoretalk.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mentoretalk.dto.LoginRequest;
import com.mentoretalk.client.AuthServiceClient;
@Service
public class UserService {

    @Autowired
    private AuthServiceClient authServiceClient;

    public String login(String email, String password) {
        LoginRequest loginRequest = new LoginRequest(email, password);
        return authServiceClient.login(loginRequest);
    }
}
