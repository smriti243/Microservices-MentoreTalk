import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Define colors to match the Overview page
const colors = {
  primary: '#333333',   // Dark gray
  secondary: '#00c785', // Bright blue for secondary
  tertiary: '#FFFFFF',  // White for tertiary
};

const PageWrapper = styled.div`
  background-image: url('assets/ai-background.png'); // Replace with the actual path to your AI-themed image
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  color: ${colors.tertiary};
  padding: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); // Dark overlay for better text visibility
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;


const Logo = styled.div`
  color: ${colors.secondary};
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const NavLink = styled(Link)`
  color: ${colors.tertiary};
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.primary};
  }
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(to right, ${colors.secondary}, ${colors.tertiary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  text-shadow: none;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 3vw, 1.5rem);
  margin-bottom: 2rem;
  text-align: center;
  color: ${colors.tertiary};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const TabButton = styled.button`
  background-color: ${props => props.active ? colors.secondary : 'transparent'};
  color: ${props => props.active ? colors.primary : colors.tertiary};
  border: 2px solid ${colors.secondary};
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.primary};
    transform: translateY(-2px);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
`;

const Label = styled.label`
  font-weight: bold;
  color: ${colors.tertiary};
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid ${colors.secondary};
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.1); 
  color: ${colors.tertiary};
  font-family: 'Courier New', Courier, monospace;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid ${colors.secondary};
  border-radius: 4px;
  background-color: rgba(255, 0, 0, 0);
  color: ${colors.primary};
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${colors.secondary};
  color: ${colors.primary};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  &:hover {
    background-color: ${colors.tertiary};
    color: ${colors.primary};
    transform: translateY(-2px);
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ResponseBox = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
  white-space: pre-wrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  background-color: rgba(248, 215, 218, 0.7);
  border: 1px solid #f5c6cb;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
`;

const LoadingSpinner = styled.div`
  border: 4px solid ${colors.tertiary};
  border-top: 4px solid ${colors.secondary};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const AICodingMentor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [difficulty, setDifficulty] = useState('easy');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('codeAnalysis');

  const languages = [
    'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Go', 'Swift',
    'Kotlin', 'TypeScript', 'PHP', 'Rust', 'Scala', 'Dart', 'R'
  ];

  const handleRequest = async (endpoint, data) => {
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const res = await axios.post(`http://localhost:5000/api/ai-mentor/${endpoint}`, data);
      setResponse(res.data[Object.keys(res.data)[0]]);
    } catch (err) {
      setError(err.response?.data?.details || err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageWrapper>
      <ContentWrapper>
        <Title>AI Coding Mentor</Title>
        <Subtitle>Your personal coding assistant powered by AI</Subtitle>

        <TabContainer>
          <TabButton active={activeTab === 'codeAnalysis'} onClick={() => setActiveTab('codeAnalysis')}>Code Analysis</TabButton>
          <TabButton active={activeTab === 'generateExercise'} onClick={() => setActiveTab('generateExercise')}>Generate Exercise</TabButton>
          <TabButton active={activeTab === 'answerQuestion'} onClick={() => setActiveTab('answerQuestion')}>Ask Question</TabButton>
        </TabContainer>

        {activeTab === 'codeAnalysis' && (
          <Form onSubmit={(e) => { e.preventDefault(); handleRequest('code-analysis', { code, language }); }}>
            <Label>Language:</Label>
            <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
              {languages.map((lang) => (
                <option key={lang} value={lang.toLowerCase()}>{lang}</option>
              ))}
            </Select>
            <Label>Code:</Label>
            <TextArea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter your code here" />
            <Button type="submit" disabled={loading}>Analyze Code</Button>
          </Form>
        )}

        {activeTab === 'generateExercise' && (
          <Form onSubmit={(e) => { e.preventDefault(); handleRequest('generate-exercise', { language, difficulty }); }}>
            <Label>Language:</Label>
            <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
              {languages.map((lang) => (
                <option key={lang} value={lang.toLowerCase()}>{lang}</option>
              ))}
            </Select>
            <Label>Difficulty:</Label>
            <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>
            <Button type="submit" disabled={loading}>Generate Exercise</Button>
          </Form>
        )}

        {activeTab === 'answerQuestion' && (
          <Form onSubmit={(e) => { e.preventDefault(); handleRequest('answer-question', { question }); }}>
            <Label>Question:</Label>
            <TextArea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Enter your programming question here" />
            <Button type="submit" disabled={loading}>Ask Question</Button>
          </Form>
        )}

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {response && <ResponseBox>{response}</ResponseBox>}
      </ContentWrapper>
    </PageWrapper>
  );
};

export default AICodingMentor;