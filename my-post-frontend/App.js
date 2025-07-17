import React, { useState, useEffect } from 'react';
import AddPostModal from './components/AddPostModal'; // Adjust the path if needed

const App = () => {
    console.log("AddPostModal mounted");
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:8000/posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  useEffect(() => {
    console.log("AddPostModal mounted");
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Post Feed</h1>
      <button onClick={() => setShowModal(true)}>Add Post</button>

      {showModal && (
        <AddPostModal setShowModal={setShowModal} fetchPosts={fetchPosts} />
      )}

      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
