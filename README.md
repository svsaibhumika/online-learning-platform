# Online Learning Platform

An online learning platform built with a **React frontend** and a **Node.js + Express backend**, designed for students and instructors to manage courses, lessons, and progress.

---

## Features
- User authentication (login & signup)
- Instructor dashboard to create and manage courses
- Student dashboard to enroll and track progress
- Course modules and lesson management
- REST API backend with Express
- Responsive frontend with React

---

## Tech Stack
- **Frontend:** React, CSS, HTML
- **Backend:** Node.js, Express
- **Database:** MongoDB (Atlas)  
- **Authentication:** JWT  

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/svsaibhumika/online-learning-platform.git
cd online-learning-platform
```
### 2. Backend Setup
Go into the backend folder and install dependencies:
```bash
cd backend
npm install
```
Start the backend server:
```bash
npm run dev
```
(or just npm start if you don’t have a dev script defined in package.json).
This will start your API server, usually on http://localhost:5000.
### 3. Frontend Setup
Open a new terminal, then:
```bash
cd frontend
npm install
npm start
```
This will start the React app, usually on http://localhost:3000.

### Environment Variables
#### Backend .env

Create a .env file inside the backend/ folder:
```env
PORT=5000
DATABASE_URL=mongodb+srv://myUser:myPassword@cluster0.abcde.mongodb.net/online-learning?retryWrites=true&w=majority
JWT_SECRET=mySuperSecretKey123
```
- Replace myUser and myPassword with your MongoDB Atlas credentials.
- Replace cluster0.abcde.mongodb.net with your MongoDB cluster host.
- You can use any database name (e.g., online-learning).
- Set a strong JWT_SECRET value for authentication.

#### Frontend .env

Create a .env file inside the frontend/ folder:
```env
REACT_APP_API_URL=http://localhost:5000
```
This tells the React app where the backend API is running.

### Usage
#### 1.Start the backend server:
```bash
cd backend
npm run dev
```
#### 2.Start the frontend app:
```bash
cd frontend
npm start
```
#### 3.Open http://localhost:3000 in your browser.
