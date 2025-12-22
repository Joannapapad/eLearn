require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 5000;

// TEST 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// DATABASE MONGO INIT CONNECTION
const connectDB = require("./config/db");
connectDB();



// COURSES ROUTE
const coursesRoutes = require("./routes/courses.routes");
app.use("/api/courses", coursesRoutes);

// BOOK ROUTE
const booksRoutes = require("./routes/book.routes");
app.use("/api/books", booksRoutes);

// VID ROUTE
const videosRoutes = require("./routes/video.routes");
app.use("/api/videos", videosRoutes);

// USER ROUTE
const usersRoutes = require("./routes/users.routes");
app.use("/api/users", usersRoutes);

// ENROLLMENTS ROUTE
const enrollmentsRoutes = require("./routes/enrollments.routes");
app.use("/api/enrollments", enrollmentsRoutes);

// ERROR ROUTE
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);