// Post.jsx

function Post({ content, author }) {
    return (
      <div className="p-4 max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{author}</div>
            <p className="mt-2 text-gray-500">{content}</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Post;
  