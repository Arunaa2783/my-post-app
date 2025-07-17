// frontend/src/services/api.ts
import axios from "axios";

const API_URL = "http://localhost:8000";

// GET all posts
export const fetchPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

// POST a new post
export const createPost = async (post: { title: string; body: string }) => {
  const response = await axios.post(`${API_URL}/posts`, post);
  return response.data;
};
