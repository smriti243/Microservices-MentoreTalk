import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Define new colors
const colors = {
  primary: '',   // Dark gray with opacity
  secondary: '#00c785', // Bright blue for secondary
  tertiary: '#FFFFFF',  // White for tertiary
};

const PageWrapper = styled.div`
  background-image: url('assets/Overview3.png'); // Replace with the actual path to your image
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
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
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

const Button = styled(Link)`
  background-color: ${colors.secondary};
  color: ${colors.tertiary};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.2s;
  &:hover {
    background-color: ${colors.tertiary};
    color: ${colors.primary};
    transform: translateY(-2px);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
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
  text-shadow: none; /* Remove text shadow to ensure gradient visibility */
`;


const Subtitle = styled.p`
  font-size: clamp(1rem, 3vw, 1.5rem);
  margin-bottom: 2rem;
  text-align: center;
  color: ${colors.tertiary};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
`;

const FeatureCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: ${colors.secondary};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: ${colors.tertiary};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const OverviewPage = () => {
  return (
    <PageWrapper>
      <ContentWrapper>
        <Header>
          <Logo>MentoreTalk</Logo>
          <Nav>
            <NavLink to="/feed">Feed</NavLink>
            <NavLink to="/mentorship">Mentorship</NavLink>
            <NavLink to="/roadmaps">Roadmaps</NavLink>
            <NavLink to="/why-mentoretalk">Why MentoreTalk</NavLink>
            <NavLink to="/how-it-works">How it Works</NavLink>
          </Nav>
          <ButtonGroup>
            <Button as="a" href="#">Download App</Button>
            <Button to="/login">Login</Button>
          </ButtonGroup>
        </Header>
        <MainContent>
          <Title>Your one stop solution for<br />skill-based learning</Title>
          <Subtitle>Connect with peers for jobs, projects and much more</Subtitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureTitle>Community</FeatureTitle>
              <FeatureDescription>Connect with 1 Lakh+ peers</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Mentors</FeatureTitle>
              <FeatureDescription>300+ Mentors, 5000+ Queries Resolved</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Ask Anything</FeatureTitle>
              <FeatureDescription>& we find you a mentor!</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Roadmaps</FeatureTitle>
              <FeatureDescription>Solve skill based roadmaps</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Problems</FeatureTitle>
              <FeatureDescription>Daily Problem Challenges</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Feed</FeatureTitle>
              <FeatureDescription>Skill Based Posts</FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </MainContent>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default OverviewPage;