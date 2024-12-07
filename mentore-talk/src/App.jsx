import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OverviewPage from './pages/OverviewPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import Feed from './pages/Feed';
import MentorsPage from './pages/MentorsPage';
import MentorProfile from './pages/MentorProfile';
import Profile from './pages/Profile';
import MentorProfileCompletionPage from './pages/MentorProfileCompletionPage';
import CreatePost from './pages/CreatePost';
import ResumeReviewPage from './pages/ResumeReviewPage';
import RoadmapsPage from './pages/RoadmapsPage';
import AICodingMentorPage from './pages/AICodingMentorPage';
import { SocketProvider } from './contexts/SocketContext';


// In your Routes component, replace the placeholder RoadmapsPage with the new component




// Placeholder components for the different pages
const CommunityPage = () => <div>Community Page</div>;
const AskPage = () => <div>Ask Page</div>;
const ProblemsPage = () => <div>Problems Page</div>;


const App = () => {
  return (
    <SocketProvider>
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<OverviewPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mentor-profile-completion" element={<MentorProfileCompletionPage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/mentor/:mentorId" element={<MentorProfile />} />



        {/* Routes with sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/mentors" element={<MentorsPage />} />
          <Route path="/ask" element={<AskPage />} />
          <Route path="/roadmaps" element={<RoadmapsPage />} />
          <Route path="/resume-review" element={<ResumeReviewPage />} />
          <Route path="/ai-mentor" element={<AICodingMentorPage />} /> {/* New route for AI Mentor */}
          
          
        </Route>
      </Routes>
    </Router>
    </SocketProvider>
  );
};

export default App;

// demn