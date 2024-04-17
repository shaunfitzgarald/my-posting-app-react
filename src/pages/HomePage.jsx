// HomePage.js
import React from 'react';
import CreatePostForm from '../components/CreatePostForm';
import PostList from '../components/PostList'; 

const HomePage = () => {
  return (
    <div>
      <CreatePostForm />
      <PostList />
      {/* Add any other components that should appear on the homepage */}
    </div>
  );
};

export default HomePage;
