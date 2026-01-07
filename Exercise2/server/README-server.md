# eLearn Server -- Part B (MEAN)

The server follows the **MEAN architecture** and is built using
**Node.js**, **Express**, and **MongoDB**.
It exposes a REST API that is consumed by the client application.

The main goal of the backend is to store, manage and serve application
data

------------------------------------------------------------------------

## Purpose

The server is responsible for:

-   Managing users, courses, books, videos and enrollments.
-   Providing REST endpoints for CRUD operations.
-   Storing data in a MongoDB database using Mongoose schemas.
-   Validating requests and handling errors gracefully.
-   Acting as the data layer of the full client--server application.

The server contains no HTML or UI logic. 

------------------------------------------------------------------------

## Technologies Used

-   **Node.js**
-   **Express.js**
-   **MongoDB**
-   **dotenv** (environment variables)
-   **cors** (cross-origin requests)

------------------------------------------------------------------------

## Environment Variables

Create a `.env` file inside the `server` folder using the following
example:

    MONGO_URI=mongodb://localhost:27017/eLearn
    PORT=5000

Make sure MongoDB is running locally before starting the server.

------------------------------------------------------------------------

## How to Run the Server

### 1. Navigate to the server directory

cd server

### 2. Install dependencies

npm install

### 3. Start the server

node src/app.js 
or 
npm run dev 

The server will start on:
http://localhost:5000
