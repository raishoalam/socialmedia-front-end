// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import NewsFeed from "./components/Post/NewsFeed";
import CreatePost from "./components/Post/CreatePost";
import FriendRequests from "./components/Friend/FriendRequests";
import Profile from './components/Profile/UpdateProfile'


import './App.css'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/newsfeed" element={<NewsFeed />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/friend-requests" element={<FriendRequests />} />
          <Route path="/profile" element={<Profile />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
