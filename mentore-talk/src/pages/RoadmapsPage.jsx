import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const colors = {
  primary: 'rgba(0, 0, 0, 0.8)',
  secondary: '#00c785',
  tertiary: '#FFFFFF',
};

const PageWrapper = styled.div`
  background-image: url('assets/Overview3.png'); // Replace with an appropriate roadmaps-related background image
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
    background-color: rgba(0, 0, 0, 0.5);
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
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 3vw, 1.5rem);
  margin-bottom: 2rem;
  text-align: center;
  color: ${colors.tertiary};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const RoadmapsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
`;

const RoadmapCard = styled.a`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: ${colors.tertiary};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const RoadmapTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: ${colors.secondary};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const NewBadge = styled.span`
  background-color: ${colors.secondary};
  color: ${colors.primary};
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const roadmaps = [
  { title: 'Frontend', url: 'https://roadmap.sh/frontend' },
  { title: 'Backend', url: 'https://roadmap.sh/backend' },
  { title: 'DevOps', url: 'https://roadmap.sh/devops' },
  { title: 'Full Stack', url: 'https://roadmap.sh/full-stack' },
  { title: 'AI Engineer', url: 'https://roadmap.sh/ai-engineer', isNew: true },
  { title: 'Data Analyst', url: 'https://roadmap.sh/data-analyst' },
  { title: 'AI and Data Scientist', url: 'https://roadmap.sh/ai-data-scientist' },
  { title: 'Android', url: 'https://roadmap.sh/android' },
  { title: 'iOS', url: 'https://roadmap.sh/ios' },
  { title: 'PostgreSQL', url: 'https://roadmap.sh/postgresql-dba' },
  { title: 'Blockchain', url: 'https://roadmap.sh/blockchain' },
  { title: 'QA', url: 'https://roadmap.sh/qa' },
  { title: 'Software Architect', url: 'https://roadmap.sh/software-architect' },
  { title: 'Cyber Security', url: 'https://roadmap.sh/cyber-security' },
  { title: 'UX Design', url: 'https://roadmap.sh/ux-design' },
  { title: 'Game Developer', url: 'https://roadmap.sh/game-developer' },
  { title: 'Technical Writer', url: 'https://roadmap.sh/technical-writer' },
  { title: 'MLOps', url: 'https://roadmap.sh/mlops' },
  { title: 'Product Manager', url: 'https://roadmap.sh/product-manager' },
  { title: 'Developer Relations', url: 'https://roadmap.sh/devrel' },
];

const RoadmapsPage = () => {
  return (
    <PageWrapper>
      <ContentWrapper>
        <MainContent>
          <Title>Explore Career Roadmaps</Title>
          <Subtitle>Choose your path and start your journey</Subtitle>
          <RoadmapsGrid>
            {roadmaps.map((roadmap, index) => (
              <RoadmapCard key={index} href={roadmap.url} target="_blank" rel="noopener noreferrer">
                <RoadmapTitle>
                  {roadmap.title}
                  {roadmap.isNew && <NewBadge>New</NewBadge>}
                </RoadmapTitle>
              </RoadmapCard>
            ))}
          </RoadmapsGrid>
        </MainContent>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default RoadmapsPage;