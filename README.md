# eLearn Platform

A two-part e-learning web application project:

* **Part A:** Static frontend (HTML, CSS, JavaScript)
* **Part B:** Full-stack MEAN-style implementation (Node.js, Express, MongoDB, client API integration)

---

# Project Overview

This project simulates a real e-learning platform with:

* Course categories (Programming, Networks, Databases, Security)
* Course and book listings
* Detailed course views
* User registration system
* Client-side filtering and search
* Optional backend with REST API and database

The focus is on:

* Clean frontend architecture
* Responsive design
* JavaScript-based interactivity
* REST API design (Part B)
* Separation of frontend and backend logic

---

# Part A — Static E-Learning Website

A fully static frontend application with no backend dependencies.

## Features

* Semantic HTML5 structure
* Mobile-first responsive layout
* Course categories and listings
* Course/book detail pages
* User registration form
* Client-side form validation
* Dynamic DOM rendering using JavaScript
* Filtering and search (client-side only)
* LocalStorage for temporary data persistence

## Tech Stack

* HTML5
* CSS3 (Flexbox, Grid)
* Vanilla JavaScript (ES6)

## Key Concepts

* DOM manipulation
* Form validation (HTML + JS)
* Responsive UI design
* Modular JavaScript structure
* Data-driven rendering using JS objects

## Run

Open the file directly:

```bash
part-a-static/index.html
```

No installation required.

---

# Part B — MEAN Stack Extension (Optional)

A full-stack version using a REST API backend and dynamic frontend data fetching.

---

## Backend (Server)

### Features

* REST API for:

  * Users
  * Courses
  * Books
  * Enrollments
  * Reviews
* MongoDB database integration
* Input validation and error handling
* JSON-based API communication

### Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* dotenv
* cors

### API Example

```
GET    /api/courses
POST   /api/users/register
GET    /api/books
POST   /api/enrollments
```

### Run Server

```bash
cd part-b-mean/server
npm install
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

## Frontend (Client)

### Features

* Single Page Application (SPA) structure
* Dynamic course loading from API
* Fetch-based communication with backend
* User registration via REST API
* Search and filtering from server data
* Modular JavaScript architecture

### Tech Stack

* Vite
* Vanilla JavaScript (ES Modules)
* HTML5 / CSS3
* Fetch API

### Run Client

```bash
cd part-b-mean/client
npm install
npm run dev
```

Client runs at:

```
http://localhost:5173
```

---

## Architecture Summary

### Part A

* Fully static
* No backend
* Data stored in JavaScript
* Client-only logic

### Part B

* Client–server architecture
* REST API backend
* MongoDB database
* Dynamic data fetching
* Separation of concerns

---

## Design Principles

* Mobile-first responsive design
* Semantic HTML structure
* Separation of UI, logic, and data
* Modular and reusable JavaScript code
* RESTful API design (Part B)
* No framework dependency in frontend

---

## Purpose

This project demonstrates:

* Frontend engineering fundamentals
* JavaScript-based application logic
* Transition from static site → full-stack architecture
* Basic MEAN-style system design
* Practical web development structure
