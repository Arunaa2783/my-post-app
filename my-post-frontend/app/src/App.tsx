// frontend/src/App.tsx
import React from "react";
import PostsList from "./components/PostsList";
import CreatePost from "./components/CreatePost";

const App: React.FC = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>My Post App</h1>
      <CreatePost />
      <hr />
      <PostsList />
    </div>
  );
};

export default App;
