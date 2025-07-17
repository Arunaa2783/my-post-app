// frontend/src/components/CreatePost.tsx
import React, { useState } from "react";
import { createPost } from "../services/api";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return alert("Please fill all fields");
    const result = await createPost({ title, body });
    alert("Post created successfully!");
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea><br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreatePost;
