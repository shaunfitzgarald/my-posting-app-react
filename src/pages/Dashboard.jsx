import React from 'react'

const Dashboard = () => {
  return (
    <div>
        <div>
            <CreatePostForm />
            <PostList />
            {/* Add any other components that should appear on the homepage */}
        </div>
    </div>
  )
}

export default Dashboard
