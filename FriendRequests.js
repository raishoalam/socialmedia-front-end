// src/components/Friend/FriendRequests.js
import React, { useState, useEffect } from 'react';

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    // Fetch friend requests from backend (Axios or Fetch)
    setFriendRequests([
      { id: 1, name: 'Alice', status: 'Pending' },
      { id: 2, name: 'Bob', status: 'Accepted' },
    ]);
  }, []);

  return (
    <div className="friend-requests-container">
      <h2>Friend Requests</h2>
      {friendRequests.map((request) => (
        <div key={request.id} className="friend-request">
          <p>{request.name} - {request.status}</p>
        </div>
      ))}
    </div>
  );
};

export default FriendRequests;
