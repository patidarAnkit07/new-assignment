// PostList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostPopup from './PostPopup';


const PostList = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, [userId]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const closePopup = () => {
    setSelectedPost(null);
  };

  return (
      <div className="post-list">
        {posts.map(post => (
          <div key={post.id} onClick={() => handlePostClick(post)} className="post-item">
            <p><strong>{post.title}</strong></p>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
  );
};

export default PostList;
