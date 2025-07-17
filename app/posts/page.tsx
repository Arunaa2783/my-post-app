'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAddPost = () => {
    const newPost: Post = {
      id: posts.length + 1,
      title: newTitle,
      body: newBody,
    };
    setPosts([...posts, newPost]); // Optimistic update
    setShowModal(false);
    setNewTitle('');
    setNewBody('');
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          + New Post
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Post</h2>
            <input
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border w-full p-2 mb-3"
            />
            <textarea
              placeholder="Body"
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              className="border w-full p-2 mb-4"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleAddPost}
                disabled={!newTitle || !newBody}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts Table */}
      <table className="w-full border-collapse border mt-4">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Body</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="p-2 border">{post.id}</td>
              <td className="p-2 border">{post.title}</td>
              <td className="p-2 border">{post.body}</td>
              <td className="p-2 border">
                <Link
                  href={`/posts/${post.id}`}
                  className="text-blue-500 underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
