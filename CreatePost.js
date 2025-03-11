// src/components/Post/CreatePost.js
import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [postContent, setPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Loading state to show user feedback
  const [error, setError] = useState('');  // Error state for handling any issues

  const handlePostCreation = async (e) => {
    e.preventDefault();
    
    // Check if post content is empty
    if (!postContent.trim()) {
      setError("Post content can't be empty.");
      return;
    }

    setIsLoading(true);  // Start loading
    setError('');  // Clear any previous errors

    try {
      const token = localStorage.getItem("token");  // Get the token from localStorage for authorization

      // Send post content to the backend API
      const response = await axios.post(
        'http://localhost:3008/api/posts', 
        { content: postContent },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token as Authorization header
          },
        }
      );
      
      // On successful post creation
      console.log('Post created successfully:', response.data);
      setPostContent('');  // Clear the post content after submission
      alert('Post created successfully!');  // Notify the user (optional)
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');  // Display error to user
    } finally {
      setIsLoading(false);  // Stop loading once the request is complete
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create a Post</h2>
      <textarea
        placeholder="What's on your mind?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handlePostCreation} disabled={isLoading}>
        {isLoading ? 'Posting...' : 'Post'}
      </button>
    </div>
  );
};

export default CreatePost;
