import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const colors = {
  primary: '#1c1e21',
  secondary: '#00c785',
  tertiary: '#FFFFFF',
  background: '#2c2f33',
  highlight: '#ffdd57',
  lightGrey: '#4a4a4a',
};

const PageWrapper = styled.div`
  background-color: ${colors.primary};
  color: ${colors.tertiary};
  min-height: 100vh;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const SearchBar = styled.input`
  padding: 1rem 1.5rem;
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  background-color: ${colors.background};
  color: ${colors.tertiary};

  &::placeholder {
    color: ${colors.lightGrey};
  }
`;

const SearchButton = styled.button`
  padding: 1rem 1.5rem;
  background-color: ${colors.secondary};
  color: ${colors.primary};
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.1s ease;

  &:hover {
    background-color: ${colors.highlight};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const MentorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const MentorCard = styled.div`
  background-color: ${colors.background};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ProfilePicture = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 3px solid ${colors.secondary};
`;

const Username = styled.h3`
  color: ${colors.secondary};
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const Experience = styled.p`
  color: ${colors.tertiary};
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.9rem;
`;

const SkillsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
`;

const SkillTag = styled.span`
  background-color: ${colors.secondary};
  color: ${colors.primary};
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.highlight};
  }
`;

const StatusMessage = styled.p`
  text-align: center;
  font-size: 1.1rem;
  margin-top: 2rem;
  color: ${props => props.error ? 'red' : colors.tertiary};
`;

const MentorsPage = () => {
  const [mentors, setMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMentors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/v1/mentors', {
        params: { search: searchTerm },
      });
      setMentors(response.data.data.mentors);
    } catch (err) {
      console.error('Error fetching mentors:', err);
      setError('Failed to fetch mentors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchMentors();
  };

  useEffect(() => {
    fetchMentors();
  }, []); // Fetch mentors on initial load

  return (
    <PageWrapper>
      <Header>
        <SearchContainer>
          <SearchBar
            type="text"
            placeholder="Search mentors by username or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </SearchContainer>
      </Header>
      {loading && <StatusMessage>Loading mentors...</StatusMessage>}
      {error && <StatusMessage error>{error}</StatusMessage>}
      <MentorGrid>
        {mentors.length > 0 ? (
          mentors.map((mentor) => (
            <Link to={`/mentor/${mentor._id}`} key={mentor._id} style={{ textDecoration: 'none' }}>
              <MentorCard>
                <ProfilePicture 
                  src={mentor.profilePicture || '/default-profile.png'} 
                  alt={mentor.username}
                />
                <Username>{mentor.username}</Username>
                <Experience>
                  {mentor.experience ? `${mentor.experience.jobTitle} at ${mentor.experience.company}` : 'No experience listed'}
                </Experience>
                <SkillsWrapper>
                  {mentor.skills && mentor.skills.length > 0 ? (
                    mentor.skills.map((skill, index) => (
                      <SkillTag key={index}>{skill}</SkillTag>
                    ))
                  ) : (
                    <SkillTag>No skills listed</SkillTag>
                  )}
                </SkillsWrapper>
              </MentorCard>
            </Link>
          ))
        ) : (
          <StatusMessage>No mentors found.</StatusMessage>
        )}
      </MentorGrid>
    </PageWrapper>
  );
};

export default MentorsPage;
