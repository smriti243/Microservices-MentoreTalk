import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { io } from 'socket.io-client';

const colors = {
  primary: '#121212', // Darker background
  secondary: '#00e676', // Bright accent color
  tertiary: '#f5f5f5', // Light text color
};

const FeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  color: ${colors.tertiary};
  background-color: ${colors.primary};
  min-height: 100vh;
`;

const PostCard = styled.div`
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Add subtle shadow for depth
`;

const SubmitButton = styled.button`
  background-color: ${colors.secondary};
  color: ${colors.primary};
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #00d065; // Slightly darker on hover
  }
`;

const FeedHeader = styled.h1`
  font-size: 2.5rem;
  color: ${colors.secondary};
  margin-bottom: 2rem;
`;

const PostForm = styled.form`
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid ${colors.secondary};
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.tertiary};
  resize: vertical;
`;

const FileInput = styled.input`
  margin-bottom: 1rem;
`;

const PostList = styled.div`
  width: 100%;
  max-width: 600px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const PostAuthor = styled.span`
  font-weight: bold;
  color: ${colors.secondary};
`;

const PostRole = styled.span`
  color: ${colors.tertiary};
  opacity: 0.7;
`;

const PostContent = styled.p`
  margin-bottom: 1rem;
`;

const PostImage = styled.img`
  width: 100%;
  height: auto; /* Maintain aspect ratio */
  object-fit: cover; /* Ensures the image fully covers the width */
  border-radius: 4px;
  margin-bottom: 1rem;
  max-width: 100%;
  display: block;
`;

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/feed');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, []);

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount

    const socket = io('http://localhost:5000', {
      transports: ['websocket'],
      upgrade: false
    });

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    // Listen for new posts
    socket.on('newPost', (post) => {
      console.log('New post received:', post);
      setPosts(prevPosts => [post, ...prevPosts]); // Add new post to the state
    });

    return () => {
      socket.disconnect(); // Clean up the connection on unmount
    };
  }, [fetchPosts]); // Include fetchPosts as a dependency

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/feed', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setContent('');
      setImage(null);
      // New post will be added by socket, no need to refetch
    } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <FeedWrapper>
      <FeedHeader>Feed</FeedHeader>
      <PostForm onSubmit={handleSubmit}>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          required
        />
        <FileInput
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
        <SubmitButton type="submit">Post</SubmitButton>
      </PostForm>
      <PostList>
        {posts.map((post) => (
          <PostCard key={post._id}>
            <PostHeader>
              <PostAuthor>{post.author.username}</PostAuthor>
              <PostRole>{post.author.role}</PostRole>
            </PostHeader>
            <PostContent>{post.content}</PostContent>
            {post.image && <PostImage src={`http://localhost:5000${post.image}`} alt="Post image" />}
          </PostCard>
        ))}
      </PostList>
    </FeedWrapper>
  );
};

export default Feed;
