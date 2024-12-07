import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Define consistent colors
const colors = {
  primary: '#0a0a0a',
  secondary: '#00c785',
  tertiary: '#FFFFFF',
};

// Styled components
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  color: ${colors.tertiary};
  background-color: ${colors.primary};
  min-height: 100vh;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  position: relative;
`;

const ProfileBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to right, ${colors.secondary}, ${colors.primary});
  opacity: 0.1;
  border-radius: 12px 12px 0 0;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  border: 4px solid ${colors.secondary};
  box-shadow: 0 0 20px rgba(0, 199, 133, 0.3);
`;

const Username = styled.h2`
  font-size: 2.5rem;
  color: ${colors.secondary};
  margin: 0 0 0.5rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Bio = styled.p`
  font-size: 1.2rem;
  color: ${colors.tertiary};
  text-align: center;
  max-width: 600px;
  margin-bottom: 1.5rem;
`;

const FollowerCount = styled.p`
  font-size: 1rem;
  color: ${colors.secondary};
`;

const Ratings = styled.p`
  font-size: 1rem;
  color: ${colors.secondary};
  margin-top: -0.5rem;
`;

const ProfileActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  background-color: ${colors.secondary};
  color: ${colors.primary};
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 199, 133, 0.2);

  &:hover {
    background-color: ${colors.tertiary};
    color: ${colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 199, 133, 0.3);
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const Tab = styled.button`
  background-color: ${colors.primary};
  color: ${colors.tertiary};
  padding: 0.75rem 1.5rem;
  border: 2px solid ${colors.secondary};
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.primary};
  }
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 800px;
  margin-top: 2rem;
`;

const SectionCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(0, 199, 133, 0.2);
  }
`;

const Input = styled.input`
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.tertiary};
  border: 1px solid ${colors.secondary};
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${colors.secondary};
  }
`;

const TextArea = styled.textarea`
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.tertiary};
  border: 1px solid ${colors.secondary};
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${colors.secondary};
  }
`;

const SectionHeader = styled.h3`
  font-size: 1.5rem;
  color: ${colors.secondary};
  margin-bottom: 1rem;
  border-bottom: 2px solid ${colors.secondary};
  padding-bottom: 0.5rem;
`;

const UserActivity = styled.div`
  color: ${colors.tertiary};
  font-size: 1.1rem;
`;
const SkillsList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillItem = styled.li`
  background-color: ${colors.secondary};
  color: ${colors.primary};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('About');
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
        setEditedData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(`Failed to fetch user data: ${err.response?.data?.message || err.message}`);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      await axios.put('http://localhost:5000/api/users/profile', editedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserData(editedData);
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError(`Failed to save profile: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNestedChange = (category, field, value) => {
    setEditedData(prevData => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: value
      }
    }));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

const renderExperience = (experience) => {
    if (!experience) return "No experience data available";
    if (typeof experience === 'string') return experience;
    
    return (
      <div>
        <p><strong>Company:</strong> {experience.company}</p>
        <p><strong>Job Title:</strong> {experience.jobTitle}</p>
        <p><strong>Start Date:</strong> {new Date(experience.startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}</p>
        <p><strong>Responsibilities:</strong> {experience.responsibilities}</p>
      </div>
    );
  };

  const renderEducation = (education) => {
    if (!education) return "No education data available";
    if (typeof education === 'string') return education;
    
    return (
      <div>
        <p><strong>Level:</strong> {education.level}</p>
        <p><strong>Field of Study:</strong> {education.fieldOfStudy}</p>
        <p><strong>Institution:</strong> {education.institution}</p>
        <p><strong>Graduation Year:</strong> {education.graduationYear}</p>
      </div>
    );
  };

  const renderSkills = (skills) => {
    if (!skills || skills.length === 0) return "No skills listed";
    return (
      <SkillsList>
        {skills.map((skill, index) => (
          <SkillItem key={index}>{skill}</SkillItem>
        ))}
      </SkillsList>
    );
  };

  if (loading) return <ProfileWrapper>Loading...</ProfileWrapper>;
  if (error) return <ProfileWrapper>{error}</ProfileWrapper>;
  if (!userData) return <ProfileWrapper>No user data found</ProfileWrapper>;

  return (
    <ProfileWrapper>
      <ProfileHeader>
        <ProfileBackground />
        <ProfileInfo>
          <ProfileImage src={userData.profilePicture || "/path/to/default-pic.jpg"} alt="User Profile" />
          {isEditing ? (
            <Input
              name="username"
              value={editedData.username}
              onChange={handleChange}
            />
          ) : (
            <Username>{userData.username}</Username>
          )}
          {isEditing ? (
            <TextArea
              name="bio"
              value={editedData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
            />
          ) : (
            <Bio>{userData.bio || "No bio available"}</Bio>
          )}
          <FollowerCount>{userData.followers?.length || 0} Followers</FollowerCount>
          <Ratings>{userData.ratings || "No ratings yet"}</Ratings>
        </ProfileInfo>
        <ProfileActions>
          {isEditing ? (
            <ActionButton onClick={handleSave}>Save Profile</ActionButton>
          ) : (
            <ActionButton onClick={handleEdit}>Edit Profile</ActionButton>
          )}
          <ActionButton>Follow</ActionButton>
        </ProfileActions>
      </ProfileHeader>

      <Tabs>
        <Tab onClick={() => handleTabClick('About')}>About</Tab>
        <Tab onClick={() => handleTabClick('Experience')}>Experience</Tab>
        <Tab onClick={() => handleTabClick('Education')}>Education</Tab>
        <Tab onClick={() => handleTabClick('Skills')}>Skills</Tab>
        <Tab onClick={() => handleTabClick('Mentor Info')}>Mentor Info</Tab>
        <Tab onClick={() => handleTabClick('Reviews')}>Reviews</Tab>
      </Tabs>

      <ProfileContent>
        {activeTab === 'About' && (
          <SectionCard>
            <SectionHeader>About</SectionHeader>
            <UserActivity>
              {isEditing ? (
                <>
                  <TextArea
                    name="bio"
                    value={editedData.bio || ''}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                  />
                </>
              ) : (
                <p>{userData.bio || "No bio available"}</p>
              )}
            </UserActivity>
          </SectionCard>
        )}

        {activeTab === 'Experience' && (
          <SectionCard>
            <SectionHeader>Experience</SectionHeader>
            <UserActivity>
              {isEditing ? (
                <>
                  <Input
                    name="company"
                    value={editedData.experience?.company || ''}
                    onChange={(e) => handleNestedChange('experience', 'company', e.target.value)}
                    placeholder="Company"
                  />
                  <Input
                    name="jobTitle"
                    value={editedData.experience?.jobTitle || ''}
                    onChange={(e) => handleNestedChange('experience', 'jobTitle', e.target.value)}
                    placeholder="Job Title"
                  />
                  <Input
                    name="startDate"
                    type="date"
                    value={editedData.experience?.startDate || ''}
                    onChange={(e) => handleNestedChange('experience', 'startDate', e.target.value)}
                  />
                  <Input
                    name="endDate"
                    type="date"
                    value={editedData.experience?.endDate || ''}
                    onChange={(e) => handleNestedChange('experience', 'endDate', e.target.value)}
                  />
                  <TextArea
                    name="responsibilities"
                    value={editedData.experience?.responsibilities || ''}
                    onChange={(e) => handleNestedChange('experience', 'responsibilities', e.target.value)}
                    placeholder="Responsibilities"
                  />
                </>
              ) : (
                renderExperience(userData.experience)
              )}
            </UserActivity>
          </SectionCard>
        )}

        {activeTab === 'Education' && (
          <SectionCard>
            <SectionHeader>Education</SectionHeader>
            <UserActivity>
              {isEditing ? (
                <>
                  <Input
                    name="level"
                    value={editedData.education?.level || ''}
                    onChange={(e) => handleNestedChange('education', 'level', e.target.value)}
                    placeholder="Degree Level"
                  />
                  <Input
                    name="fieldOfStudy"
                    value={editedData.education?.fieldOfStudy || ''}
                    onChange={(e) => handleNestedChange('education', 'fieldOfStudy', e.target.value)}
                    placeholder="Field of Study"
                  />
                  <Input
                    name="institution"
                    value={editedData.education?.institution || ''}
                    onChange={(e) => handleNestedChange('education', 'institution', e.target.value)}
                    placeholder="Institution"
                  />
                  <Input
                    name="graduationYear"
                    value={editedData.education?.graduationYear || ''}
                    onChange={(e) => handleNestedChange('education', 'graduationYear', e.target.value)}
                    placeholder="Graduation Year"
                  />
                </>
              ) : (
                renderEducation(userData.education)
              )}
            </UserActivity>
          </SectionCard>
        )}

        {activeTab === 'Skills' && (
          <SectionCard>
            <SectionHeader>Skills</SectionHeader>
            <UserActivity>
              {isEditing ? (
                <TextArea
                  name="skills"
                  value={editedData.skills?.join(', ') || ''}
                  onChange={(e) => setEditedData({...editedData, skills: e.target.value.split(', ')})}
                  placeholder="Enter skills separated by commas"
                />
              ) : (
                renderSkills(userData.skills)
              )}
            </UserActivity>
          </SectionCard>
        )}

        {activeTab === 'Mentor Info' && (
          <SectionCard>
            <SectionHeader>Mentor Information</SectionHeader>
            <UserActivity>
              {isEditing ? (
                <>
                  <Input
                    name="teachingExperience"
                    value={editedData.teachingExperience || ''}
                    onChange={handleChange}
                    placeholder="Teaching Experience"
                  />
                  {editedData.teachingExperience === 'Professor' && (
                    <Input
                      name="academicInstitution"
                      value={editedData.academicInstitution || ''}
                      onChange={handleChange}
                      placeholder="Academic Institution"
                    />
                  )}
                  <Input
                    name="currentCompany"
                    value={editedData.currentCompany || ''}
                    onChange={handleChange}
                    placeholder="Current Company"
                  />
                  <TextArea
                    name="mentorSpecialty"
                    value={editedData.mentorSpecialty?.join(', ') || ''}
                    onChange={(e) => setEditedData({...editedData, mentorSpecialty: e.target.value.split(', ')})}
                    placeholder="Enter mentor specialties separated by commas"
                  />
                </>
              ) : (
                <>
                  <p><strong>Teaching Experience:</strong> {userData.teachingExperience || 'Not specified'}</p>
                  {userData.teachingExperience === 'Professor' && (
                    <p><strong>Academic Institution:</strong> {userData.academicInstitution || 'Not specified'}</p>
                  )}
                  <p><strong>Current Company:</strong> {userData.currentCompany || 'Not specified'}</p>
                  <p><strong>Mentor Specialties:</strong> {userData.mentorSpecialty?.join(', ') || 'Not specified'}</p>
                </>
              )}
            </UserActivity>
          </SectionCard>
        )}

        {activeTab === 'Reviews' && (
          <SectionCard>
            <SectionHeader>Reviews</SectionHeader>
            <UserActivity>
              {userData.reviews?.length > 0
                ? userData.reviews.map((review, index) => <div key={index}>{review}</div>)
                : "No reviews yet"}
            </UserActivity>
          </SectionCard>
        )}
      </ProfileContent>
    </ProfileWrapper>
  );
};

export default Profile;