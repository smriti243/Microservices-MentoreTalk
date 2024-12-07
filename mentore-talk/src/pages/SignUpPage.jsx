import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styled, { keyframes } from 'styled-components';

// Animations
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
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

// Styled Components
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

const FormSection = styled.div`
  flex: 0.60;
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
  transition: all 0.3s ease;

  &::placeholder {
    color: #888;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 199, 133, 0.5);
    border-color: #00c785;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #aaa;
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
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SignInLink = styled.p`
  margin-top: 20px;
  text-align: left;
  color: #aaa;

  a {
    color: #00c785;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ToggleButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ToggleButton = styled.button`
  padding: 10px 20px;
  border: 2px solid #00c785;
  background-color: ${({ active }) => (active ? '#00c785' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#00c785')};
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:first-child {
    border-right: none;
  }

  &:hover {
    background-color: #00c785;
    color: #fff;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  margin-bottom: 10px;
`;

const SuccessMessage = styled.p`
  color: #51cf66;
  margin-bottom: 10px;
`;

const SignupPage = () => {
  const [role, setRole] = useState('mentor');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!agreeToTerms) {
      setError('You must agree to the Terms and Conditions');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        localStorage.setItem('token', data.token);

        if (role === 'mentor') {
          // Redirect mentors to the profile completion page after signup
          setTimeout(() => {
            navigate('/mentor-profile-completion');
          }, 2000);
        } else {
          // Redirect other users to the feed page
          setTimeout(() => {
            navigate('/feed');
          }, 2000);
        }


        // Redirect to login page after successful signup
       // Optional delay before redirect
      } else {
        setError(data.message || 'An error occurred during signup');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <PageWrapper>
      <PageContainer>
        <RotatingTextSection>
          <Text3DWrapper>
            <Text3D>
              <FrontFace>MentoreTalk</FrontFace>
              <BackFace>Connect to Mentors</BackFace>
            </Text3D>
          </Text3DWrapper>
        </RotatingTextSection>
        <FormSection>
          <Title>Sign up</Title>
          <Subtitle>Welcome to MentoreTalk. Register to connect with mentors.</Subtitle>

          <ToggleButtonGroup>
            <ToggleButton active={role === 'mentor'} onClick={() => setRole('mentor')}>
              Sign up as a Mentor
            </ToggleButton>
            <ToggleButton active={role === 'student'} onClick={() => setRole('student')}>
              Sign up as a Student
            </ToggleButton>
          </ToggleButtonGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>Signup successful! Redirecting...</SuccessMessage>}

          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                required
              />
              <CheckboxLabel htmlFor="agreeToTerms">
                I agree to the Terms and Conditions
              </CheckboxLabel>
            </CheckboxContainer>
            <Button type="submit">Create Account</Button>
          </Form>
          <SignInLink>
            Already a member? <a href="/login">Sign in</a>
          </SignInLink>
        </FormSection>
      </PageContainer>
    </PageWrapper>
  );
};

export default SignupPage;
