// Import necessary libraries
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Define keyframes for animations
const bouncyAnimation = keyframes`
  0% { top: 0em; }
  40% { top: 0em; }
  43% { top: -0.9em; }
  46% { top: 0em; }
  48% { top: -0.4em; }
  50% { top: 0em; }
  100% { top: 0em; }
`;

const rotateAnimation = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
`;

// Define styled components
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-image: url('assets/Overview3.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 80vh;
  background: rgba(15, 15, 15, 0.9);
  color: white;
  border: 2px solid #00c785;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(14, 167, 233, 0.3);
  backdrop-filter: blur(10px);
`;

const ImageSection = styled.div`
  flex: 1.5;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #aaa;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  background-color: rgba(26, 26, 26, 0.8);
  color: white;

  &::placeholder {
    color: #888;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #00c785;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  animation: ${bouncyAnimation} 5s infinite linear;

  &:hover {
    background-color: #0056b3;
  }
`;

const SignUpLink = styled.p`
  margin-top: 20px;
  text-align: left;
  color: #aaa;

  a {
    color: #00c785;
    text-decoration: none;
  }
`;

const RotatingTextSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Text3DWrapper = styled.div`
  perspective: 1000px;
`;

const Text3D = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: #00c785;
  animation: ${rotateAnimation} 10s infinite linear;
  transform-style: preserve-3d;
`;

const Text3DFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FrontFace = styled(Text3DFace)`
  transform: rotateY(0deg);
`;

const BackFace = styled(Text3DFace)`
  transform: rotateY(180deg);
`;

// Define the LoginPage component
const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok) {
        setSuccess(true);
        localStorage.setItem('token', data.token);
        navigate('/feed');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <PageWrapper>
      <PageContainer>
        <ImageSection>
          <RotatingTextSection>
            <Text3DWrapper>
              <Text3D>
                <FrontFace>MentoreTalk</FrontFace>
                <BackFace>Connect to Mentors</BackFace>
              </Text3D>
            </Text3DWrapper>
          </RotatingTextSection>
        </ImageSection>
        <FormSection>
          <Title>Log in</Title>
          <Subtitle>Welcome back! Log in to access your account.</Subtitle>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Username or Email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Log In</Button>
            {error && <p style={{ color: '#ff6b6b', marginTop: '10px' }}>{error}</p>}
          </Form>
          <SignUpLink>
            New to our platform? <a href="/signup">Sign up</a>
          </SignUpLink>
        </FormSection>
      </PageContainer>
    </PageWrapper>
  );
};

export default LoginPage;
