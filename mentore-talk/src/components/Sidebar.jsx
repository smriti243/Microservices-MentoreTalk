import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, X, Users, Book, HelpCircle, Map, Code, Rss, FileText } from 'lucide-react';

// Define new colors
const colors = {
  primary: 'rgba(18, 18, 18, 0.8)',   // Dark gray with opacity
  secondary: '#00c785', // Bright green for secondary
  tertiary: '#FFFFFF',  // White for tertiary
};

// Updated styles for the Sidebar
const SidebarContainer = styled.div`
  position: fixed;
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  top: 0;
  height: 100vh;
  width: 250px;
  background-color: ${colors.primary};
  transition: left 0.3s ease-in-out;
  z-index: 1000;
  backdrop-filter: blur(8px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${colors.secondary};
  color: ${colors.tertiary};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
`;

const SidebarContent = styled.nav`
  padding: 1rem;
  z-index: 2;
  position: relative;
`;

const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: ${colors.tertiary};
  text-decoration: none;
  transition: background-color 0.3s, transform 0.2s;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 2;

  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.primary};
    transform: translateY(-2px);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  left: ${({ isOpen }) => (isOpen ? '250px' : '10px')};
  top: 10px;
  background-color: ${colors.secondary};
  color: ${colors.tertiary};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: left 0.3s ease-in-out;
  z-index: 1001;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 999;
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          MentoreTalk
          {isOpen ? (
            <X onClick={toggleSidebar} />
          ) : (
            <Menu onClick={toggleSidebar} />
          )}
        </SidebarHeader>
        <SidebarContent>
          <SidebarItem to="/mentors">
            <Book /> Mentors
          </SidebarItem>
          <SidebarItem to="/ask">
            <HelpCircle /> Ask Anything
          </SidebarItem>
          <SidebarItem to="/roadmaps">
            <Map /> Roadmaps
          </SidebarItem>
          <SidebarItem to="https://contest-hub-live.vercel.app/">
            <Code /> Contest
          </SidebarItem>
          <SidebarItem to="/feed">
            <Rss /> Feed
          </SidebarItem>
          <SidebarItem to="/resume-review">
            <FileText /> Resume Review
          </SidebarItem>
          <SidebarItem to="/ai-mentor">
            <Book /> AI MENTOR
          </SidebarItem>
        </SidebarContent>
      </SidebarContainer>
      <ToggleButton isOpen={isOpen} onClick={toggleSidebar}>
        {isOpen ? <X /> : <Menu />}
      </ToggleButton>
      <Overlay isOpen={isOpen} onClick={toggleSidebar} />
    </>
  );
};

export default Sidebar;