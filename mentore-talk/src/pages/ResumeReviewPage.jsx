import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload } from 'lucide-react';

const ResumeReviewPage = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [comment, setComment] = useState('');
  const [userRole, setUserRole] = useState('student'); // This should be determined by your authentication system
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/resumes');
      setResumes(response.data);
    } catch (error) {
      setError('Error fetching resumes. Please try again later.');
      console.error('Error fetching resumes:', error);
    }
    setLoading(false);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('resume', file);
      try {
        // Get the token from wherever you're storing it (e.g., localStorage)
        const token = localStorage.getItem('token');
        
        const response = await axios.post('http://localhost:5000/api/resumes/upload', formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` // Add this line
          }
        });
        setSuccessMessage('Resume uploaded successfully!');
        fetchResumes();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('Unauthorized. Please log in again.');
        } else {
          setError('Error uploading resume. Please try again.');
        }
        console.error('Error uploading resume:', error);
      }
      setLoading(false);
    }
  };
  
  const handleCommentSubmit = async () => {
    if (selectedResume && comment.trim() !== '') {
      setLoading(true);
      setError(null);
      try {
        await axios.post(`http://localhost:5000/api/resumes/${selectedResume._id}/comment`, { text: comment });
        setComment('');
        setSuccessMessage('Comment added successfully!');
        fetchResumeDetails(selectedResume._id);
      } catch (error) {
        setError('Error submitting comment. Please try again.');
        console.error('Error submitting comment:', error);
      }
      setLoading(false);
    }
  };

  const fetchResumeDetails = async (resumeId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/resumes/${resumeId}`);
      setSelectedResume(response.data);
    } catch (error) {
      setError('Error fetching resume details. Please try again.');
      console.error('Error fetching resume details:', error);
    }
    setLoading(false);
  };


  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Resume Review</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {successMessage}</span>
        </div>
      )}

      {userRole === 'student' && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Submit Your Resume</h2>
          <div className="flex items-center space-x-4">
            <input type="file" onChange={handleFileUpload} accept=".pdf,.doc,.docx" className="flex-grow" />
            <button 
              onClick={() => {}} 
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <Upload className="inline-block mr-2 h-4 w-4" />
              Upload Resume
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userRole === 'mentor' && (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <h2 className="text-xl font-semibold mb-4">Resumes to Review</h2>
            {loading ? (
              <p>Loading resumes...</p>
            ) : resumes.length === 0 ? (
              <p>No resumes available for review.</p>
            ) : (
              <ul className="space-y-2">
                {resumes.map(resume => (
                  <li
                    key={resume._id}
                    onClick={() => fetchResumeDetails(resume._id)}
                    className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                  >
                    <span className="font-semibold">{resume.student.username}</span>
                    <span className="float-right text-sm text-gray-500">
                      {new Date(resume.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {selectedResume && (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <h2 className="text-xl font-semibold mb-4">{selectedResume.student.username}'s Resume</h2>
            <p className="mb-4">Uploaded on: {new Date(selectedResume.createdAt).toLocaleDateString()}</p>
            <h3 className="text-lg font-semibold mb-2">Comments:</h3>
            {selectedResume.comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <ul className="space-y-2">
                {selectedResume.comments.map((comment, index) => (
                  <li key={index} className="bg-gray-100 p-2 rounded">
                    <p className="font-semibold">{comment.mentor.username}:</p>
                    <p>{comment.text}</p>
                  </li>
                ))}
              </ul>
            )}
            {userRole === 'mentor' && (
              <div className="mt-4">
                <textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none mb-2"
                  rows="4"
                />
                <button 
                  onClick={handleCommentSubmit} 
                  disabled={loading || comment.trim() === ''}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Comment
                </button>
              </div>
            )}
          </div>
        )}

        {userRole === 'student' && (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <h2 className="text-xl font-semibold mb-4">Your Resume</h2>
            {loading ? (
              <p>Loading your resume...</p>
            ) : resumes.length === 0 ? (
              <p>You haven't uploaded a resume yet.</p>
            ) : (
              <>
                <p className="mb-4">Uploaded on: {new Date(resumes[0].createdAt).toLocaleDateString()}</p>
                <h3 className="text-lg font-semibold mb-2">Mentor Comments:</h3>
                {resumes[0].comments.length === 0 ? (
                  <p>No comments yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {resumes[0].comments.map((comment, index) => (
                      <li key={index} className="bg-gray-100 p-2 rounded">
                        <p className="font-semibold">{comment.mentor.username}:</p>
                        <p>{comment.text}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeReviewPage;