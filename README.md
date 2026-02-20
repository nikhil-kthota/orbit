# Orbit

A scalable task management web application with JWT authentication and a full CRUD dashboard. Built with React.js, Node.js/Express, and Supabase.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite), React Router v6, Tailwind CSS v3 |
| Backend | Node.js, Express.js |
| Database | Supabase (PostgreSQL) |
| Auth | JWT + bcrypt |

## Features

- Register / Login / Logout with JWT authentication
- Protected routes — dashboard requires login
- Create, read, update, delete tasks
- Search tasks by title, filter by status and priority
- Overdue task detection
- User profile view and edit
- Collapsible sidebar, animated stat cards, toast notifications
- Dark orange/grey/silver theme

## Project Structure

```
AUTH AND DASH/
├── client/          # React frontend
├── server/          # Node/Express backend
├── docs/
│   ├── Orbit.postman_collection.json
│   └── SCALING.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js >= 18
- A Supabase project

### 1. Database Setup

Run this SQL in your Supabase project SQL editor:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  bio TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','in-progress','completed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low','medium','high')),
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. Backend Setup

```bash
cd server
cp .env.example .env
```

Fill in `.env`:

```
PORT=5000
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_random_secret_here
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

```bash
npm install
npm run dev
```

### 3. Frontend Setup

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## API Reference

Import `docs/Orbit.postman_collection.json` into Postman. The Login request automatically stores the JWT token as a collection variable for subsequent requests.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | — | Register a new user |
| POST | `/api/auth/login` | — | Login and receive JWT |
| GET | `/api/profile` | ✓ | Get authenticated user profile |
| PUT | `/api/profile` | ✓ | Update name and bio |
| GET | `/api/tasks` | ✓ | List tasks (supports `?q=`, `?status=`, `?priority=`) |
| POST | `/api/tasks` | ✓ | Create a task |
| PUT | `/api/tasks/:id` | ✓ | Update a task |
| DELETE | `/api/tasks/:id` | ✓ | Delete a task |

## Scaling

See [docs/SCALING.md](docs/SCALING.md) for the full production scaling plan.
