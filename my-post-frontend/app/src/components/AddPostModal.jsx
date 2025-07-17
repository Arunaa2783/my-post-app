import React, { useState } from 'react';

const AddPostModal = ({ setShowModal, fetchPosts }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleAddPost = async () => {
    console.log("Submitting:", title, body); // 🔍 See this log in DevTools

    if (!title || !body) return;

    try {
      await fetch('http://localhost:8000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body }),
      });
      fetchPosts();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to add post:', error);
    }
  };

  return (
    <div className="modal">
      <h2>Add New Post</h2>

      {/* 🔻 Add this to check if modal is rendering */}
      <p style={{ color: 'red' }}>✅ Modal is mounted</p>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="button-group">
        <button onClick={handleAddPost}>Add</button>
        <button onClick={() => setShowModal(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default AddPostModal;
