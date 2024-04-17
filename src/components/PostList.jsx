import React, { useState, useEffect } from 'react';
import Post from './Post';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error('Data is not an array:', data);
          setPosts([]);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Post key={post.id} content={post.content} author={post.user?.name} />
        ))}
      </div>
    </div>
  );
}

export default PostList;
