# Orbit API Documentation

The Orbit API follows REST principles. All requests should be sent to the base URL followed by the specific route.

## Authentication
Most endpoints require a JWT token in the Authorization header:
`Authorization: Bearer <your_token>`

### User Registration
- Route: `POST /api/auth/register`
- Body: `name`, `email`, `password`
- Description: Creates a new user account.

### User Login
- Route: `POST /api/auth/login`
- Body: `email`, `password`
- Description: Authenticates the user and returns a mission clearance token (JWT).

## Missions (Tasks)
### List Missions
- Route: `GET /api/tasks`
- Query Params (Optional): `q`, `status`, `priority`
- Description: Returns a list of all missions for the logged in user.

### Create Mission
- Route: `POST /api/tasks`
- Body: `title` (required), `description`, `status`, `priority`, `due_date`
- Description: Logs a new mission into the command center.

### Update Mission
- Route: `PUT /api/tasks/:id`
- Body: Fields to update
- Description: Modifies an existing mission by its ID.

### Delete Mission
- Route: `DELETE /api/tasks/:id`
- Description: Permanently removes a mission from the system.

## Profile
### Get Profile
- Route: `GET /api/profile`
- Description: Fetches the details of the active commander.

### Update Profile
- Route: `PUT /api/profile`
- Body: `name`, `bio`
- Description: Updates the user profile information.

### Delete Account
- Route: `DELETE /api/profile`
- Description: Terminates the account and wipes all user data from the database.
