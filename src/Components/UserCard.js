// UserCard.js
import React from 'react';

const UserCard = ({ user, onClick }) => {

  if (!user || !user.length) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="user-card" onClick={onClick}>
      <div className="user-name">{user.name}</div>
      <div className="post-count">{user.posts.length} posts</div>
    </div>
  );
};

export default UserCard;
