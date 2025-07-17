'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/posts')
      .then((res) => res.json())
      .then((data: Post[]) => {
        const selected = data.find((p) => p.id === Number(id));
        if (selected) {
          setPost(selected);
          setTitle(selected.title);
        }
        setLoading(false);
      });
  }, [id]);

  const handleEditTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (post) setPost({ ...post, title: e.target.value }); // Optimistic update
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Post #{post.id} Details</h1>

      <div className="mb-4">
        <label className="font-medium">Title:</label>
        <input
          value={title}
          onChange={handleEditTitle}
          className="border p-2 w-full mt-1"
        />
      </div>

      <div className="mb-4">
        <label className="font-medium">Body:</label>
        <p className="border p-2 bg-gray-50 mt-1">{post.body}</p>
      </div>

      {/* Placeholder for basic analysis */}
      <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Basic Analysis</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li><strong>Word Count from body:</strong> {post.body.trim().split(/\s+/).length}</li>
          <li><strong>Character Count from body:</strong> {post.body.length}</li>
          <li><strong>Title Length:</strong> {title.length} characters</li>
        </ul>
      </div>
    </div>
  );
}
