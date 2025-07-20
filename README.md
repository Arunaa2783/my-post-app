# My Post App

A full-stack demo application that showcases modern **Next.js 14** with an integrated **C++ micro-service**, SQL persistence, API-key protected routes.

---

## ✨ Features

| Area | Capability |
| --- | --- |
| Front-end | • Next.js/React with App Router<br>• Tailwind CSS for utility-first styling<br>• Responsive layout and mobile-first design
| Posts UI | • Paginated landing page that consumes https://jsonplaceholder.typicode.com/posts<br>• Modal to create a post (optimistic update)<br>• Dedicated details page with inline title editing & basic analysis
| C++ Logic | • REST micro-service written in modern C++20 (path: `cpp-backend/`)<br>• Word-count, keyword extraction & sentiment scoring endpoints<br>• Dockerised & reachable from the Next.js API
| API Layer | • Next.js API routes (path: `pages/api/*`) acting as **BFF**<br>• Protected with HMAC API keys (header `x-api-key`)
| Persistence | • PostgreSQL via Prisma ORM<br>• **Database is seeded by fetching posts from [jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)**<br>• Scripts to sync mock posts and store analysis logs
| MLOps (bonus) | • Optional FastAPI service with Hugging Face `distilbert-base-uncased-finetuned-sst-2` for sentiment<br>• CI/CD with GitHub Actions, MLflow experiment tracking
| Deployment | • Front-end & API on **Vercel**<br>• C++ & Python services on **Render**<br>• DB on **Railway**

---

## 🛠️ Tech Stack

* **Next.js 14** / React 18 / TypeScript
* **Tailwind CSS**
* **Prisma + PostgreSQL**
* **C++20** (REST via Crow) ‑ compiled inside Docker
* **Python 3.11** + FastAPI 
* **Docker & docker-compose**
* **GitHub Actions** for CI, **MLflow** for model versioning

---

## 🖼️ Architecture Overview

```
┌─────────────────────────┐         ┌─────────────────────────┐
│  Browser / Mobile UI    │  HTTP   │  Next.js 14 Front-end   │
│  (React + Tailwind)     ├────────▶│  (pages/ & app/ routes) │
└─────────────────────────┘         │     │           │       │
                                    │ SSR │ API Routes│ gRPC? │
                                    └─────┴───────┬───┴───────┘
                                                  │ REST
                     docker network               ▼
                                        ┌────────────────────┐   gRPC / REST   ┌────────────────────┐
                                        │   C++ Service      │◀───────────────▶│  Python ML Service │
                                        │ (word/sentiment)   │                 │  (optional)        │
                                        └─────────┬──────────┘                 └─────────┬──────────┘
                                                  │                      ┌──────┴───────┐
                                                  └──────────────────────▶  PostgreSQL  │
                                                                         └─────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js >=18
* Docker & Docker Compose
* CMake + a C++20 compiler (only if you want to build the service outside Docker)

### 1. Clone & Install

```bash
# clone
$ git clone https://github.com/Arunaa2783/my-post-app.git
$ cd my-post-app

# install JS deps
$ npm ci  # or pnpm install
```

### 2. Environment Variables

Create a `.env` in the repo root:

```dotenv
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postdb"

# API key for protected routes
NEXT_PUBLIC_APP_KEY="super-secret-key"
API_KEY="super-secret-key"

# External services
CPP_SERVICE_URL="http://localhost:5000"
ML_SERVICE_URL="http://localhost:8000"   # optional
```

### 3. Start the stack

```bash
# spin up Postgres and the C++ container
$ docker-compose -f backend-infra/docker-compose.yaml up -d

# push schema & seed DB (uses Prisma)
$ npx prisma migrate deploy
$ npm run seed

# run Next.js in dev mode
$ npm run dev
```

Open http://localhost:3000 and enjoy! ✨

### 4. Building the C++ service manually (optional)

```bash
$ cd cpp-backend
$ mkdir build && cd build
$ cmake .. -DCMAKE_BUILD_TYPE=Release
$ make -j$(nproc)
$ ./post-service 5000  # runs on port 5000
```

---

## 📂 Project Structure

```
my-post-app/
 ├─ app/                    # Next.js 14 (app router)
 ├─ pages/                  # API routes (pages router)
 ├─ components/             # Reusable React components
 ├─ prisma/                 # DB schema & migrations
 ├─ cpp-backend/            # Modern C++ REST micro-service
 ├─ backend-infra/          # docker-compose, k8s manifests, etc.
 ├─ scripts/                # Seeders & utilities
 ├─ public/                 # Static assets
 ├─ tests/                  # Playwright & Jest
 └─ README.md
```

---

## 🔐 API Key Protection

All mutating endpoints require the header:

```
POST /api/posts  HTTP/1.1
x-api-key: <API_KEY>
```

A middleware in `pages/api/_middleware.ts` validates the key and returns **401** when missing or invalid.

---

## ⚙️ Useful Scripts

| Command | Purpose |
| ------- | ------- |
| `npm run dev` | Run Next.js in development mode |
| `npm run build` | Build production assets |
| `npm run start` | Start production server |
| `npm run seed` | Sync mock posts into Postgres |
| `npm run cpp:dev` | Hot-reload C++ service (via Docker) |
| `npm run test` | Jest + React Testing Library |
| `npm run e2e` | Playwright end-to-end tests |

---

## ☁️ Deployment

1. **Front-end & API** — push the repo to Vercel; it detects Next.js automatically.
2. **C++ & ML services** — create Docker images (`docker build -t <name> .`) and deploy to Render.
3. **Database** — spin up PostgreSQL on Railway and set the `DATABASE_URL` secret in Vercel + Render.
4. Add the same `API_KEY` secret everywhere.

> A live demo is available at: https://my-post-app.vercel.app

---

## 📈 CI/CD & MLOps

* **GitHub Actions**: lint, type-check, unit tests, Docker image publish, deploy on `main`.
* **MLflow**: track versions of the sentiment model (`ml/` folder) and automatically redeploy when a new model lands.

---

## 🤝 Contributing

Pull requests are welcome!  Please open an issue first to discuss what you would like to change.

---

## 📝 License

This project is released under the MIT License — see the [LICENSE](LICENSE) file for details.
