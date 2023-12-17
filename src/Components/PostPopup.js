import React from 'react';

const PostPopup = ({ post, onClose }) => {
    
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <button onClick={onClose}>Close</button>
        
      </div>
    </div>
  );
};

export default PostPopup;
