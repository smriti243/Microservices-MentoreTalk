from locust import HttpUser, task, between

class LoadTestUser(HttpUser):
    wait_time = between(1, 3)  # Wait time between tasks

    @task
    def login(self):
        self.client.post("/api/signup", json={
            "email": "test@example.com",
            "username": "test",
            "password": "password123"
        })
