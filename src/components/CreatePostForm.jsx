// CreatePostForm.jsx

import React, { useState } from 'react';

function CreatePostForm({ onNewPost }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: { content } }),
      });
  
      if (response.ok) {
        const newPost = await response.json();
        onNewPost(newPost);
        setContent('');
      } else {
        console.error("HTTP Error:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        className="resize-none border rounded focus:outline-none focus:shadow-outline w-full py-2 px-3 text-gray-700 leading-tight"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Post
      </button>
    </form>
  );
}


export default CreatePostForm;
