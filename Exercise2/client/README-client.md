# eLearn Client (Part B)

Frontend of the eLearn platform, developed with Vite and modular JavaScript.
The client communicates with a REST API built with Node.js, Express, and MongoDB.

## Technologies
- Vite
- Vanilla JavaScript (ES Modules)
- HTML5 / CSS3
- REST API communication via fetch

## Project Structure

client/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.js
│   ├── pages/
│   │   ├── home.js
│   │   ├── courses.js
│   │   ├── courseDetails.js
│   │   ├── register.js
│   │   └── about.js
│   ├── components/
│   │   └── navbar.js
│   └── services/
│       └── api.service.js

## Features
- Single Page Application navigation (SPA)
- Dynamic loading of courses from backend
- Course details view
- User registration form (POST JSON)
- Error handling for failed API requests
- Centralized API service

## API Communication
All HTTP requests are centralized in `api.service.js`.
The frontend communicates with the backend via `/api/*` endpoints.

## Development

Install dependencies:
```bash
npm install
