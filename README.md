# Authentication Web Application

A full-stack web application with React frontend, Node.js/Express backend, and MongoDB database.

## Features

- User authentication (Sign In/Sign Up)
- Protected routes
- JWT-based authentication
- MongoDB database integration
- Material-UI components

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/auth-app
   JWT_SECRET=your-secret-key-here
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Running the Application

1. Make sure MongoDB is running locally or update the MONGODB_URI in the backend/.env file to point to your MongoDB Atlas cluster.

2. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

3. In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
.
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── SignIn.js
│   │   │   │   └── SignUp.js
│   │   │   └── Dashboard/
│   │   │       └── Dashboard.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
``` 