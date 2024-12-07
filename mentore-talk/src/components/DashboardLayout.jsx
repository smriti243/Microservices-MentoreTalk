import React, { useState } from 'react';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import { Outlet, Link } from 'react-router-dom';

// Define new colors consistent with OverviewPage
const colors = {
  primary: '#0a0a0a', // Darker background
  secondary: '#00c785', // Bright green for secondary
  tertiary: '#FFFFFF',  // White for tertiary
};

// Layout Wrapper with Gradient Background
const LayoutWrapper = styled.div`
  display: flex;
  background: linear-gradient(135deg, rgba(10, 10, 10, 1), rgba(28, 28, 28, 1)); 
  min-height: 100vh;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6); // Dark overlay for better text visibility
    z-index: 1;
  }
`;

// Main Content Area
const Content = styled.main`
  flex: 1;
  padding: 2rem;
  color: ${colors.tertiary};
  min-height: 100vh;
  position: relative;
  z-index: 2; /* Ensure content is above the background overlay */
`;

// Header Style
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  color: ${colors.tertiary};
  padding: 1rem;
  border-bottom: 1px solid ${colors.secondary};
  background-color: rgba(0, 0, 0, 0.3); /* Transparent background for header */
`;

// Logo Style with Subtle Glow
const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${colors.secondary};
`;

// Navigation Style
const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

// NavLink Style with Hover Effect
const NavLink = styled.a`
  color: ${colors.tertiary};
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  border: 2px solid ${colors.primary}; // Black border
  background-color: ${colors.primary}; // Black background
  transition: background-color 0.3s, color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.primary};
    transform: scale(1.1);
  }
`;

// Chat Pop-up Style
const ChatPopup = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 25%; /* 1/4th of the page */
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
  padding: 1rem;
  color: ${colors.tertiary};
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.5);
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

// Notifications Popup Style
const NotificationsPopup = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 20%; /* Smaller width than chat */
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 11;
  padding: 1rem;
  color: ${colors.tertiary};
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.5);
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

// Close Button for Chat and Notif
const CloseButton = styled.button`
  background-color: ${colors.secondary};
  color: ${colors.primary};
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background-color: ${colors.tertiary};
    color: ${colors.primary};
  }
`;

// Notification Item Style
const NotificationItem = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid ${colors.tertiary}; /* Divider line between notifications */
`;

const DashboardLayout = () => {
  // State to manage chat and notification visibility
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isNotifVisible, setIsNotifVisible] = useState(false);

  // Function to toggle chat window visibility
  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  // Function to toggle notification window visibility
  const toggleNotif = () => {
    setIsNotifVisible(!isNotifVisible);
  };

  return (
    <LayoutWrapper>
      <Sidebar />
      <Content>
        <Header>
          <Logo>MentoreTalk</Logo>
          <Nav>
            <NavLink as={Link} to="/profile">Profile</NavLink>
            <NavLink as={Link} to="/settings">Settings</NavLink>
            <NavLink as="button" onClick={toggleChat}>Chat</NavLink>
            <NavLink as="button" onClick={toggleNotif}>Notif</NavLink> {/* Notif Option */}
          </Nav>
        </Header>
        <Outlet /> {/* This is where the child routes will be rendered */}
      </Content>

      {/* Chat Pop-up */}
      <ChatPopup isVisible={isChatVisible}>
        <CloseButton onClick={toggleChat}>Close Chat</CloseButton>
        <h3>Chat Screen</h3>
        <p>This is your chat window. Here you can chat with your mentors or users!</p>
      </ChatPopup>

      {/* Notifications Pop-up */}
      <NotificationsPopup isVisible={isNotifVisible}>
        <CloseButton onClick={toggleNotif}>Close Notifications</CloseButton>
        <h3>Notifications</h3>
        {/* Sample Notifications */}
        <NotificationItem>New message from Mentor</NotificationItem>
        <NotificationItem>Your session is scheduled for tomorrow</NotificationItem>
        <NotificationItem>Payment confirmed</NotificationItem>
        {/* Add more notifications here */}
      </NotificationsPopup>
    </LayoutWrapper>
  );
};

export default DashboardLayout;
