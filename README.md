# My Post App

A full-stack blog platform for creating, analyzing, and managing posts with integrated C++ backend logic.
This project features a **Next.js frontend**, **C++ backend logic integration**, **PostgreSQL database**, API key protection, and deployment-ready architecture.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage Guide](#usage-guide)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Assignment Mapping](#assignment-mapping)
- [License](#license)

---

## Overview

This project is a **responsive blog application** with full CRUD features, powered by a modern Next.js frontend and a robust backend with **C++ logic** for post analysis (e.g., word count, sentiment, or keyword extraction).
All critical backend endpoints are **API key protected**. The backend persists post and analysis data to a **PostgreSQL database**, and the system is designed for cloud deployment.

---

## Features

- **Responsive UI** built in Next.js with Tailwind CSS
- **Landing page** displays paginated, searchable table of posts (fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts))
- **Post Details Page** with editable title, full content, and C++-powered analysis (e.g., word count)
- **Create Post** modal for adding new posts (optimistic UI updates)
- **Backend API** with endpoints to fetch, create, and update posts (API-key protected)
- **C++ Integration** for post analysis (called from backend)
- **SQL Database** (PostgreSQL) for persistent storage
- **API Key Protection** for write endpoints
- **Deployment Ready** for Vercel, Render, Railway, etc.
- **Extensible for ML/MLOps**: Easily plug in a FastAPI ML service and CI/CD tools

---

## Architecture

```
[Next.js Frontend]
        │
        ▼
[Backend API (FastAPI/Python)]
        │
 ┌──────┴────────┐
 │               │
 ▼               ▼
[PostgreSQL] [C++ Backend for Analysis]
```

- **Frontend:** Next.js fetches and displays posts, and talks to backend for CRUD/analysis.
- **Backend:** Handles API routing, data persistence, API key validation, and triggers C++ analysis logic.
- **C++ Integration:** Backend calls a C++ executable (e.g., for word count) using Python’s `subprocess` or via a REST/gRPC endpoint.
- **Database:** PostgreSQL stores posts and analysis logs.

---

## Project Structure

```
my-post-app/
│
├── app/
│   ├── cpp-backend/           # C++ analysis logic (e.g., main.cpp)
│   └── posts/                 # Next.js pages (dynamic post routes)
│
├── backend-infra/             # Python FastAPI backend & Docker configs
│   ├── database.py
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── init_db.py
│   ├── init.sql
│   ├── main.cpp (if integrated here)
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── server.py
│   └── start.sh
│
├── my-post-frontend/          # Next.js frontend (UI, components)
│   └── app/
│       └── src/
│           ├── components/
│           └── services/
│
└── ... (other project files)
```

---

## Setup Instructions

### **1. Clone the Repository**

```bash
git clone https://github.com/Arunaa2783/my-post-app.git
cd my-post-app
```

### **2. Database Setup**

- **Recommended:**
  Run PostgreSQL using **Docker Desktop** for easy setup.
  Make sure Docker Desktop is running, then:

  ```bash
  cd backend-infra
  docker-compose up db
  ```

- **Alternative (manual install):**
  If you do not use Docker, install PostgreSQL locally and run:

  ```bash
  psql -U postgres -f backend-infra/init.sql
  ```

## 🚀 Getting Started
## Setup Instructions

### **1. Clone the Repository**

```bash
git clone https://github.com/Arunaa2783/my-post-app.git
cd my-post-app
```

### **2. Database Setup**

- **Recommended:**
  Run PostgreSQL using **Docker Desktop** for easy setup.
  Make sure Docker Desktop is running, then:

  ```bash
  cd backend-infra
  docker-compose up db
  ```

- **Alternative (manual install):**
  If you do not use Docker, install PostgreSQL locally and run:

  ```bash
  psql -U postgres -f backend-infra/init.sql
  ```

### 3. Start the stack
- **Backend Setup:**
```bash
# Spin up Postgres and backend services
cd backend-infra
docker-compose up -d

# In a new terminal, start the FastAPI server (if not started by Docker)
uvicorn server:app --reload


- **Frontend Setup:**
# In another terminal, run Next.js frontend in dev mode
cd ../my-post-frontend
npm install
npm run dev

```


## Usage Guide

- Visit `http://localhost:3000` for the frontend.
- Add/edit/delete/view posts.
  Post detail pages show C++ analysis (e.g., word count).
- Only authenticated (API key) requests can modify data via the backend.

---


## 🔐 API Key Protection

All mutating endpoints require the header:

```
POST /api/posts  HTTP/1.1
x-api-key: my-secret-api-key
```

A middleware in `pages/api/_middleware.ts` validates the key and returns **401** when missing or invalid.



## ☁️ Deployment

1. **Frontend** — push the repo to Vercel; it detects Next.js automatically.
2. **Backend** — create Docker images (`docker build -t <name> .`) and deploy to Render.
3. **Database** — spin up PostgreSQL on Railway and set the `DATABASE_URL` secret in Vercel + Render.
4. **C++ logic** — containerized and run as a separate service if desired.

> A live demo is available at: https://my-post-app.vercel.app

---

**Maintainer:** [Arunaa G T](https://www.linkedin.com/in/arunaa-g-t/)

## 🤝 Contributing

Pull requests are welcome!  Please open an issue first to discuss what you would like to change.

---

## 📝 License

This project is released under the MIT License — see the [LICENSE](LICENSE) file for details.
