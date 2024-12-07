import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const colors = {
  primary: '#1c1e21',
  secondary: '#00c785',
  tertiary: '#FFFFFF',
  background: '#2c2f33',
};

const PostForm = styled.form`
  background-color: ${colors.background};
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const PostInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.tertiary};
`;

const PostTextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.tertiary};
`;

const PostButton = styled.button`
  padding: 0.8rem 2rem;
  background-color: ${colors.secondary};
  border: none;
  border-radius: 8px;
  color: ${colors.tertiary};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 199, 133, 0.8);
  }
`;

const CreatePost = () => {
  const [newPost, setNewPost] = useState({ title: '', description: '', image: null });
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  const handlePostInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost({ ...newPost, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    // Post creation logic here
    navigate('/feed');
  };

  return (
    <PostForm onSubmit={handlePostSubmit}>
      <PostInput
        type="text"
        name="title"
        placeholder="Post Title"
        value={newPost.title}
        onChange={handlePostInputChange}
      />
      <PostTextArea
        name="description"
        rows="5"
        placeholder="What's on your mind?"
        value={newPost.description}
        onChange={handlePostInputChange}
      />
      <input type="file" onChange={handleImageChange} />
      {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%' }} />}
      <PostButton type="submit">Post</PostButton>
    </PostForm>
  );
};

export default CreatePost;
