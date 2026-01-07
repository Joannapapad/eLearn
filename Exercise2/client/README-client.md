# eLearn Client -- Part B (MEAN)

The client extends the static frontend from Part A and connects it to a
backend REST API implemented with **Node.js, Express and MongoDB**.\
All application data (users, courses, books, videos, enrollments) is
fetched dynamically from the server.

The application is implemented as a **Single Page Application (SPA)**
using **Vite** and **modular Vanilla JavaScript (ES Modules)**.


## Purpose

The goal of the client is to:

-   Communicate with the backend through REST endpoints.
-   Dynamically display data retrieved from the database.
-   Handle user interaction without full page reloads.
-   Demonstrate separation of concerns between UI logic and API
    communication.

The client contains **no hardcoded data** for entities that are stored
in the database.

## Technologies Used

-   **Vite** -- Development server and build tool
-   **Vanilla JavaScript (ES Modules)**
-   **HTML5 / CSS3**
-   **Fetch API** -- REST communication
-   **Hash-based routing** for SPA navigation


## API Communication

All communication with the backend is handled through
**src/services/api.service.js**.

The client communicates with the backend using REST endpoints:

/api/courses\
/api/books\
/api/videos\
/api/users\
/api/enrollments

During development, requests to /api/\* are proxied to the backend
server using Vite configuration.

## Development Setup

### 1. Install dependencies

npm install

### 2. Start the development server

npm run dev

The client will be available at:

http://localhost:5173

Make sure the backend server is running before using the client.

