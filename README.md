# Full-Stack Task Management App

This project is a complete full-stack web application built as part of a frontend developer assessment. It is a scalable and secure platform with a modern tech stack, featuring a React frontend and a Node.js backend. The application provides full user authentication and complete CRUD functionality for managing tasks.

## ✨ Features

- **Secure User Authentication:** Users can register and log in securely using a JWT-based authentication system.  
- **Protected Routes:** The main task dashboard is a protected route, accessible only to authenticated users.  
- **Full CRUD Functionality:** Authenticated users can Create, Read, Update (edit title and mark as complete), and Delete their own tasks.  
- **Interactive UI:** Real-time search and filter system allows users to easily find tasks by title or completion status.  
- **Client-Side Validation:** Registration form includes immediate validation for password length to enhance user experience.  
- **RESTful API:** A well-structured backend API built with Node.js and Express to handle all data operations.  

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Authentication:** JSON Web Tokens (JWT), bcrypt.js  
- **Database:** MongoDB Atlas  

## 🚀 Getting Started

Follow these steps to get a local copy of the project running.

### Prerequisites

- Node.js (v18 or later)  
- npm  
- A free MongoDB Atlas account or a local MongoDB instance  

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. Install backend dependencies:

```bash
cd server
npm install
```

3. Install frontend dependencies:

```bash
cd ../client
npm install
```

### Environment Variables

The backend requires a `.env` file for sensitive information.  

1. In the `server` directory, create a file named `.env`.  
2. Add the following variables, replacing the placeholder values:

```env
# Your MongoDB connection string
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/yourDatabaseName?retryWrites=true&w=majority

# A long, random string for signing JWTs
JWT_SECRET=YOUR_SUPER_SECRET_KEY
```

### Running the Application

1. Start the backend server (from the `server` directory):

```bash
npm start
```

The server will run on [http://localhost:5000](http://localhost:5000).  

2. Start the frontend development server (from the `client` directory):

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).  

## 👤 Author

**Tushar Mishra**  
Email: tm3390782@gmail.com

