
# eLearn Platform – Server Side (MEAN Stack)

This project implements the **server-side (backend)** of an e-learning platform as part of the course assignment.  
The backend follows the **MEAN architecture**, using **Node.js**, **Express**, and **MongoDB**.

---

## 📌 Project Description

The server provides a RESTful API for managing:
- Users
- Courses
- Books
- Videos
- Enrollments

All data are stored in **MongoDB** and accessed through **Mongoose models**.  
The backend is responsible for handling requests from the client-side application.

---

## 🛠 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **dotenv**
- **cors**

---

## 📁 Project Structure

```

server/
│
├── .env
├── package.json
└── src/
├── app.js
├── config/
│   └── db.js
├── models/
│   ├── user.model.js
│   ├── course.model.js
│   ├── book.model.js
│   ├── video.model.js
│   └── enrollment.model.js
├── routes/
│   ├── users.routes.js
│   ├── courses.routes.js
│   ├── books.routes.js
│   ├── videos.routes.js
│   └── enrollments.routes.js
├── controllers/
│   ├── users.controller.js
│   ├── courses.controller.js
│   ├── books.controller.js
│   ├── videos.controller.js
│   └── enrollments.controller.js
└── middleware/
└── errorHandler.js

```

---

## ⚙️ Environment Variables

Create a `.env` file in the `server` directory with the following content:

```

MONGO_URI=mongodb://localhost:27017/eLearn
PORT=5000

````

---

## ▶️ How to Run the Server

1. Navigate to the server directory:
```bash
cd server
````

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
node src/app.js
```

The server will run on:

```
http://localhost:5000
```

---

## 🔗 API Endpoints

| Resource    | Endpoint           |
| ----------- | ------------------ |
| Users       | `/api/users`       |
| Courses     | `/api/courses`     |
| Books       | `/api/books`       |
| Videos      | `/api/videos`      |
| Enrollments | `/api/enrollments` |

---

## 🧪 Testing

The API can be tested using:

* Browser (GET requests)
* Postman or similar REST clients

Example:

```
GET http://localhost:5000/api/courses
```

---

## 📚 Notes

* Data are inserted manually into MongoDB.
* No authentication is implemented, as it was not required by the assignment.
* The project focuses on backend structure and REST API design.

---

##  Author

Student: Ioanna
Course: Web Information Systems
Academic Year: 2024–2025
