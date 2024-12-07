import React from 'react';
import styled from 'styled-components';
import { FaImage, FaCalendarAlt, FaPen } from 'react-icons/fa'; // Icons for media, event, and article

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0f0f0f; // Dark primary color
  padding: 10px 20px;
  border-radius: 8px;
  color: white;
  box-shadow: 0 0 10px rgba(0, 199, 133, 0.3);
  position: sticky;  // Makes the nav bar stay at the top
  top: 0;  // Align it to the top of the page
  z-index: 1000; // Ensure it stays above the rest of the content
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const PostPrompt = styled.div`
  flex-grow: 1;
  margin-left: 15px;
  font-size: 16px;
  font-family: 'Arial', sans-serif; // Clear and readable font
  color: #aaa;
  cursor: pointer;

  &:hover {
    color: #00c785; // Light green secondary color on hover
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PostIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 15px;
  background-color: #222;
  border-radius: 50%;
  color: #00c785; // Light green color for icons
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }

  svg {
    font-size: 20px;
  }
`;

const HorizontalNavBar = () => {
  return (
    <NavBar>
      <ProfileImage src="profile-image-url.jpg" alt="User Profile" />

      <PostPrompt>
        What’s on your mind?
      </PostPrompt>

      <IconWrapper>
        <PostIcon title="Share Media">
          <FaImage />
        </PostIcon>
        <PostIcon title="Create Event">
          <FaCalendarAlt />
        </PostIcon>
        <PostIcon title="Write Article">
          <FaPen />
        </PostIcon>
      </IconWrapper>
    </NavBar>
  );
};

export default HorizontalNavBar;
