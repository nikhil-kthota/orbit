# Orbit - Mission Control

Orbit is a high-performance mission management platform designed for commanders who need precision, speed, and a sleek tactical interface. Built on a modern full-stack architecture, Orbit provides a centralized dashboard for tracking critical tasks (missions) with a focus on premium aesthetics and robust security.

---

## ◈ Premium Aesthetics
Orbit isn't just a task manager; it's a command center.
- **Glassmorphism UI**: Deep gradients, backdrop blurs, and subtle orange glows create a futuristic "Mission Control" feel.
- **Micro-animations**: Typewriter greetings, hexagon count-up animations, and smooth slide-up transitions.
- **Thematic Consistency**: A cohesive "Dark Orange & Silver" palette used across headers, sidebars, and interactive cards.
- **Responsive Command**: Seamlessly scales from desktop wide-screens to mobile field units.

## ⬢ Core Features
- **Secure Uplink**: JWT-based authentication with bcrypt hashing and custom auth error handling.
- **Mission Briefings**: Create, edit, and track missions with titles, notes, and priority levels.
- **Tactical Dashboard**:
  - Live stat cards (Total, Completed, In Orbit, Overdue).
  - Advanced filtering (Search, Status, Priority).
  - Visual density - see your entire operation at a glance.
- **Commander Profiles**: Manage your call sign, bio, and clearance levels (Danger Zone for account termination).
- **Proactive Security**: Hardened with Supabase Row-Level Security (RLS) to ensure data isolation.

---

## ⚙ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite), Tailwind CSS, React Router v7, Axios, Lucide Icons |
| **Backend** | Node.js, Express.js |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Stateless JWT + bcrypt hashing |

---

## 🚀 Getting Started

### 1. Database Setup (Supabase)
Run the following SQL in your Supabase SQL Editor to initialize the schema and security policies:

```sql
-- Create Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  bio TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Tasks Table
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

-- Enable Row-Level Security (RLS)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Block unauthorized direct access (all traffic flows through backend API)
CREATE POLICY "tasks_api_access" ON tasks FOR ALL TO service_role USING (true);
CREATE POLICY "users_api_access" ON users FOR ALL TO service_role USING (true);
```

### 2. Backend Config
```bash
cd server
cp .env.example .env
npm install
```
Update `.env` with your secrets and Supabase credentials. Use `SUPABASE_SERVICE_ROLE_KEY` to allow the API to bypass RLS for its own logic.

### 3. Frontend Config
```bash
cd client
cp .env.example .env
npm install
```
Update `VITE_API_URL` to point to your backend (default: `http://localhost:5000`).

### 4. Launch
- **Server**: `npm run dev` (Runs on port 5000)
- **Client**: `npm run dev` (Runs on port 5173)

---

## 🔒 Security Architecture
Orbit implements a hybrid security model:
1. **Stateless JWT**: Authentication is handled locally by the Express server, making the system easy to scale horizontally.
2. **Service Role Access**: The backend communicates with Supabase using a service role key, acting as the ultimate authority for data validation.
3. **Database Guardrails**: RLS is strictly enabled. Direct table access via the Supabase REST API is blocked for `anon` and `authenticated` roles, forcing all data through our secure backend pipeline.

---

## 🛠 Project Structure
```text
ORBIT/
├── client/           # React mission control interface
└── server/           # Node.js command API
    ├── config/       # Supabase client config
    ├── controllers/  # Business logic (Auth, Tasks, Profile)
    ├── middleware/   # JWT verification guard
    ├── routes/       # API endpoint definitions
    └── utils/        # Generic helpers
```
