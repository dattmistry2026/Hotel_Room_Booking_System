# Havenstay — Hotel Room Booking System

A full-stack MERN application for managing a hotel's room inventory. Users can
register, sign in, maintain their profile, and manage rooms (add, view,
edit, delete) with pricing and availability.

## Features

- Secure user authentication (register, login, JWT-based sessions)
- Profile management (name, email, university, address)
- Room management
  - Add a room (number, type, price per night)
  - View all rooms in a card grid, with availability status
  - Edit an existing room
  - Delete a room
- Protected API routes — room and profile endpoints require a valid token

## Tech stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18, React Router, Tailwind CSS, Axios |
| Backend  | Node.js, Express, Mongoose |
| Database | MongoDB (MongoDB Atlas) |
| Auth     | JWT (jsonwebtoken) + bcrypt password hashing |

## Project structure


## Prerequisites

- [Node.js](https://nodejs.org/en) (v18+ recommended)
- [Git](https://git-scm.com/)
- A code editor, e.g. [VS Code](https://code.visualstudio.com/)
- A [MongoDB Atlas](https://account.mongodb.com/account/login) account and cluster

## Setup

1. **Clone the repository**
```bash
   git clone <your-repo-url>
   cd Hotel_Room_Booking_System
```

2. **Install dependencies** (root, backend, and frontend in one step)
```bash
   npm run install-all
```

3. **Configure environment variables**

   Create a `backend/.env` file with:

   
4. **Run the app** (starts backend on port 5001 and frontend on port 3000)
```bash
   npm start
```

   For backend auto-reload during development, use:
```bash
   npm run dev
```

   The frontend will be available at `http://localhost:3000` and the backend
   API at `http://localhost:5001`.

## API reference

All room and profile routes require an `Authorization: Bearer <token>` header,
obtained from `/api/auth/login`.

### Auth — `/api/auth`
| Method | Endpoint    | Description              | Auth required |
|--------|-------------|---------------------------|----------------|
| POST   | `/register` | Create a new account      | No |
| POST   | `/login`    | Sign in, returns a token  | No |
| GET    | `/profile`  | Get the current user's profile | Yes |
| PUT    | `/profile`  | Update the current user's profile | Yes |

### Rooms — `/api/rooms`
| Method | Endpoint | Description        | Auth required |
|--------|----------|---------------------|----------------|
| GET    | `/`      | List all rooms       | Yes |
| POST   | `/`      | Add a room            | Yes |
| PUT    | `/:id`   | Update a room         | Yes |
| DELETE | `/:id`   | Delete a room         | Yes |

## Troubleshooting

**`Error: listen EADDRINUSE: address already in use :::5001` (or `:::3000`)**

This means something is already running on that port — usually a previous
`npm start` still active in another terminal window. The fix is to free the
port, not to change it:

- **Windows**
```powershell
  netstat -ano | findstr :5001
  taskkill /PID <pid_from_last_column> /F
```
- **macOS / Linux**
```bash
  lsof -i :5001
  kill -9 <pid>
```

Repeat for port `3000` if the frontend also fails to start, then run
`npm start` again.

## License

ISC
