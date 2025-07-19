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

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSavePost = async () => {
    if (!newTitle || !newBody) return;

    try {
      let res;
      if (editingPostId !== null) {
        res = await fetch(`http://localhost:8000/posts/${editingPostId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'my-secret-api-key',
          },
          body: JSON.stringify({ title: newTitle, body: newBody }),
        });
        const updatedPost = await res.json();
        setPosts((prev) =>
          prev.map((post) => (post.id === editingPostId ? updatedPost : post))
        );
      } else {
        // Set id to 1 if there are no posts, otherwise let backend handle it
        const bodyObj =
          posts.length === 0
            ? { id: 1, title: newTitle, body: newBody }
            : { title: newTitle, body: newBody };
        res = await fetch('http://localhost:8000/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'my-secret-api-key',
          },
          body: JSON.stringify(bodyObj),
        });
        const savedPost = await res.json();
        setPosts((prev) => [...prev, savedPost]);
      }

      setNewTitle('');
      setNewBody('');
      setEditingPostId(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleEditClick = (post: Post) => {
    setNewTitle(post.title);
    setNewBody(post.body);
    setEditingPostId(post.id);
    setShowModal(true);
  };

  const handleDeletePost = async (postId: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`http://localhost:8000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "x-api-key": "my-secret-api-key",
        },
      });

      if (res.ok) {
        setPosts((prev) => prev.filter((post) => post.id !== postId));
      } else {
        console.error("Failed to delete post");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-blue-700 drop-shadow">Posts</h1>
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition-transform"
          onClick={() => {
            setShowModal(true);
            setNewTitle('');
            setNewBody('');
            setEditingPostId(null);
          }}
        >
          + New Post
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-blue-100">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              {editingPostId !== null ? 'Edit Post' : 'Add New Post'}
            </h2>
            <input
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border border-blue-200 rounded w-full p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <textarea
              placeholder="Body"
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              className="border border-blue-200 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded text-white ${!newTitle || !newBody ? 'bg-blue-300' : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition-transform'}`}
                onClick={handleSavePost}
                disabled={!newTitle || !newBody}
              >
                {editingPostId !== null ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-4 mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 text-blue-700">
              <th className="p-2 border-b text-left">ID</th>
              <th className="p-2 border-b text-left">Title</th>
              <th className="p-2 border-b text-left">Body</th>
              <th className="p-2 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-blue-50 transition">
                <td className="p-2 border-b text-left">{post.id}</td>
                <td className="p-2 border-b text-left">{post.title}</td>
                <td className="p-2 border-b text-left">{post.body}</td>
                <td className="p-2 border-b flex gap-6 text-left">
                  <Link href={`/posts/${post.id}`} className="text-blue-600 underline hover:text-blue-800">
                    View
                  </Link>
                  <button
                    className="text-green-600 underline hover:text-green-800"
                    onClick={() => handleEditClick(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 underline hover:text-red-800"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
