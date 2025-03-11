// src/components/Post/NewsFeed.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  // State for loading
  const [error, setError] = useState('');  // State for error messages

  useEffect(() => {
    // Fetch posts from the backend when the component mounts
    const fetchPosts = async () => {
      setIsLoading(true);  // Set loading to true before API call
      setError('');  // Reset any previous error

      try {
        const token = localStorage.getItem("token");  // Retrieve the token from localStorage
        const response = await axios.get('http://localhost:3008/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,  // Include token in the Authorization header
          },
        });
        setPosts(response.data);  // Set the posts data in the state
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setIsLoading(false);  // Set loading to false once the request is complete
      }
    };

    fetchPosts();  // Call the function to fetch posts
  }, []);  // Empty dependency array means it runs only once when the component mounts

  return (
    <div className="newsfeed-container">
      <h2>News Feed</h2>
      {isLoading ? (
        <p>Loading posts...</p>  // Show loading text while fetching posts
      ) : error ? (
        <p className="error-message">{error}</p>  // Show error message if any
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default NewsFeed;
