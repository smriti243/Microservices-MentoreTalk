import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: #0a0a0a;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: #0078ff;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    color: #0078ff;
  }
`;

const Button = styled(Link)`
  background-color: #0078ff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  &:hover {
    background-color: #0056b3;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo to="/">MentoreTalk</Logo>
      <Nav>
        <NavLink to="/feed">Feed</NavLink>
        <NavLink to="/mentorship">Mentorship</NavLink>
        <NavLink to="/roadmaps">Roadmaps</NavLink>
        <NavLink to="/about">Why MentoreTalk</NavLink>
        <NavLink to="/how-it-works">How it Works</NavLink>
      </Nav>
      <Button to="/login">Login</Button>
    </HeaderWrapper>
  );
};

export default Header;