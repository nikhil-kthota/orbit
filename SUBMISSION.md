# Assignment Submission: Orbit Mission Control

This project is a full-stack task management application called Orbit. It handles user authentication and provides a secure dashboard for managing tasks.

## Deliverables Overview

1. **GitHub Repo**: You are looking at it. The project is split into a `client` (React) and a `server` (Node/Express).
2. **Authentication**: Users can register, login, and logout. All protected routes are guarded by a JWT middleware. Passwords are salted and hashed using bcrypt.
3. **CRUD Dashboard**: The main feature is the Mission Control dashboard where users can create, view, update, and delete tasks (missions).
4. **API Documentation**: Detailed below in the API Reference section.
5. **Scaling Plan**: Detailed below in the Production Scaling section.

---

## Technical Implementation

### Frontend
- Built with React and Vite.
- Styled using Tailwind CSS for a custom dark-themed UI.
- Uses Axios for API communication with a centralized interceptor to handle JWT headers.
- Implements protected routing to stop unauthenticated users from seeing the dashboard.

### Backend
- Built with Node.js and Express.
- Uses Supabase as the PostgreSQL database.
- Database security is enforced using Row Level Security (RLS) to keep user data isolated.
- The server uses the Supabase service role key to manage data while users are siloed.

---

## API Reference

The backend exposes a REST API at the `/api` prefix.

### Auth Endpoints
- **POST /api/auth/register**: Creates a new user. Needs `name`, `email`, and `password`.
- **POST /api/auth/login**: Authenticates a user and returns a JWT.

### Task Endpoints (Requires JWT)
- **GET /api/tasks**: Gets all tasks for the logged-in user. Supports filtering by query, status, and priority.
- **POST /api/tasks**: Creates a new task.
- **PUT /api/tasks/:id**: Updates an existing task by ID.
- **DELETE /api/tasks/:id**: Deletes a task by ID.

### Profile Endpoints (Requires JWT)
- **GET /api/profile**: Gets the current user's profile details.
- **PUT /api/profile**: Updates user metadata like name and bio.
- **DELETE /api/profile**: Completely deletes the user account and all their tasks.

---

## Scaling for Production

To take this from an assignment to a production-ready system, I would focus on these specific areas for scaling the integration:

### 1. Load Balancing and Statelessness
Since the backend uses JWTs, it is stateless. This means we can run multiple instances of the Express server behind a load balancer like Nginx or an AWS ALB. Requests can go to any instance without losing the user session.

### 2. Database Performance
As the number of tasks grows, I would add database indexes on the `user_id` and `status` columns in the tasks table. This keeps searches and filters fast even with millions of rows. Using a connection pooler like Supabase's built-in PgBouncer would also help handle a high volume of simultaneous backend connections.

### 3. Caching Layer
I would implement Redis to cache frequently accessed data like user profiles or dashboard statistics. This reduces the load on the primary database for data that does not change every second.

### 4. Robust Assets and CDN
Currently, the React app is served as static files. In production, these should be hosted on a CDN (like AWS CloudFront or Vercel's global edge) to ensure low latency and fast loading times for users regardless of their location.

### 5. Security Hardening
While we have RLS enabled, I would add rate-limiting on the API endpoints to prevent brute-force attacks. I would also move to using short-lived access tokens with a secure refresh token stored in an HttpOnly cookie to better protect against XSS and token theft.
