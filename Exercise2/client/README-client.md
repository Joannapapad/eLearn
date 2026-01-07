Sure! Here’s the same README fully in **Markdown** format, ready to use:

```markdown
# eLearn Client (Part B)

This folder contains the frontend of the **eLearn platform**, developed as part of *Part B (Εργασία ΙΙ)*.  
The client is a Single Page Application built with **Vite** and **Vanilla JavaScript**, and it communicates with a REST API implemented with **Node.js, Express, and MongoDB**.

The goal of the client is to provide dynamic navigation and interaction with the backend without full page reloads.

---

## Technologies Used
- **Vite** (development server & build tool)
- **Vanilla JavaScript (ES Modules)**
- **HTML5 / CSS3**
- **Fetch API** for REST communication

---

## Project Structure

```

client/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.js
│   ├── pages/
│   │   ├── home.js
│   │   ├── courses.js
│   │   ├── course-details.js
│   │   ├── register.js
│   │   └── about.js
│   ├── components/
│   │   ├── navbar.js
│   │   └── footer.js
│   └── services/
│       └── api.service.js
└── assets/
├── css/
└── img/

```

---

## Features
- Single Page Application (SPA) using hash-based routing
- Dynamic loading of courses, books, and videos from the backend
- Course details page with enrollment functionality
- User registration and login forms
- Enrollment in courses for logged-in users
- Centralized API service for all HTTP requests
- Basic error handling and user feedback

---

## API Communication
All API requests are handled through **`api.service.js`**, which acts as a single point of communication with the backend.

The client communicates with the server through the following endpoint structure:

```

/api/courses
/api/books
/api/videos
/api/users
/api/enrollments

````

During development, requests to `/api/*` are proxied to the backend server via Vite configuration.

---

## Development Setup

### 1. Install dependencies
```bash
npm install
````

### 2. Start the development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## Notes

* The frontend is designed to work together with the eLearn backend (Node.js / Express / MongoDB).
* User authentication state is stored in `localStorage`.
* The application follows a modular structure for better readability and maintenance.

---

## Part of

**eLearn Platform – Part B (Εργασία ΙΙ)**
Department of Informatics

```

This is fully ready to save as `README.md`.  

If you want, I can also **write a matching backend README** in the same style so the project looks polished and complete. Do you want me to do that?
```
