// src/components/Profile/UpdateProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateProfile.css'; // Import the CSS for styling

const UpdateProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Load user data when the component mounts (e.g., from an API or localStorage)
  useEffect(() => {
    // Example: Fetch the current user profile (replace with your API call)
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3008/api/profile'); // Get user data
        setUsername(response.data.username);
        setEmail(response.data.email);
        setImagePreview(response.data.profileImage); // Assuming profileImage is returned in response
      } catch (error) {
        console.error('Error fetching profile data', error);
      }
    };

    fetchProfile();
  }, []);

  // Handle image change for file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  // Handle profile update submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    if (profileImage) {
      formData.append('profileImage', profileImage); // Append the selected file
    }

    try {
      const response = await axios.put('http://localhost:3008/api/profile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });

      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-update-container">
      <h2>Update Your Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="profileImage">Profile Image</label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Profile Preview" />
            </div>
          )}
        </div>

        <button type="submit" className="update-button">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
