// PostList.jsx

import React, { useState, useEffect } from 'react';
import Post from './Post';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from API
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3000/posts'); // Replace with your API URL
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} content={post.content} author={post.user.name} />
      ))}
    </div>
  );
}

export default PostList;
