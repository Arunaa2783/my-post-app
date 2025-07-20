"use client";
// frontend/src/components/PostsList.tsx
import React, { useEffect, useState } from "react";
import { fetchPosts } from "../services/api";

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    getData();
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>: {post.body}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostsList;
