# Role-Based Task Management System (Backend)

1. Project Description
   Project Name

Role-Based Task Management System (Backend)

What this system does (high level)

This backend system allows an organization to:

Manage users with different roles

Assign and track tasks

Control who can do what using role-based authorization

There is no frontend dependency. This backend can be used by:

Web apps

Mobile apps

Admin dashboards

2. Core Roles in the System
1. Admin

Can create users

Can assign roles

Can view all users and tasks

Has full system access

2. Manager

Can create tasks

Can assign tasks to employees

Can view tasks of their team

3. Employee

Can view assigned tasks

Can update task status (pending, in-progress, completed)

This role separation is the industry standard for internal tools.

3. Authentication & Authorization Flow
   Authentication (Who are you?)

User logs in using email + password

Server verifies credentials

Server issues a JWT token

Authorization (What can you do?)

JWT token is verified in middleware

User role is extracted from token

Access is granted or denied based on role

Example:

Employee cannot create users

Manager cannot delete users

Admin can do everything

4. Task Lifecycle (Simple but Realistic)

Manager creates a task

Task is assigned to an employee

Employee updates task status

Manager/Admin can track progress

Each task has:

Title

Description

Assigned user

Status

CreatedBy

Timestamps

5. Why This Project Is Industry-Relevant

This project demonstrates:

JWT-based authentication

Role-based access control (RBAC)

Secure password handling

Clean Express architecture

Mongoose schema design

Middleware usage

Production-level folder structure

Recommended permissions
| Action | Admin | Manager | Employee |
| ------------------ | ----- | ------- | -------- |
| Create task | ✅ | ✅ | ❌ |
| Assign task | ❌ | ✅ | ❌ |
| View own tasks | ❌ | ❌ | ✅ |
| View all tasks | ✅ | ✅ | ❌ |
| Update task status | ❌ | ❌ | ✅ |
| Delete task | ✅ | ❌ | ❌ |

# Role-Based Task Management System – Backend

## 🚀 Deployment on Render (Production Setup)

This backend application has been successfully deployed on **Render (Free Tier)** and connected to **MongoDB Atlas** for cloud database hosting. Below are the exact steps followed to deploy this project, which can be reproduced for future deployments.

---

## 🧱 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas (Cloud Database)**
- **Mongoose**
- **JWT Authentication**
- **Cloudinary (for media handling)**
- **Render (Cloud Deployment)**

---

## 🌐 Live API URL

```
https://role-based-task-management-system-backend-jxpw.onrender.com
```

> ⚠️ Note: Render free-tier services may spin down due to inactivity and take ~30–50 seconds to respond on the first request.

---

## 📦 Deployment Steps on Render

### 1️⃣ Push Code to GitHub

- The complete backend code was pushed to a **public GitHub repository**.
- The `.env` file was **excluded** using `.gitignore` to keep secrets secure.

---

### 2️⃣ Create MongoDB Atlas Cluster

- Created a **free MongoDB Atlas cluster**.
- Created a **database user** with `readWriteAnyDatabase` role.
- Added **Network Access** rule:

  ```
  0.0.0.0/0 (Allow access from anywhere)
  ```

  _(Required for Render to access Atlas)_

---

### 3️⃣ Create a Web Service on Render

- Selected **New Web Service**
- Connected **GitHub repository**
- Chose:

  - **Language:** Node
  - **Branch:** main
  - **Instance Type:** Free

---

### 4️⃣ Build & Start Commands

```bash
Build Command: npm install
Start Command: node index.js
```

---

### 5️⃣ Configure Environment Variables on Render

The following environment variables were added directly in the **Render Dashboard** (not committed to GitHub):

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/rbacDB
PORT=5000
ACCESS_TOKEN_SECRET=youraccesstokensecret
ACCESS_TOKEN_EXPIRY=15m

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### 6️⃣ Deploy & Verify

- Clicked **Deploy Web Service**
- Verified logs showed:

  ```
  Server running on port 5000
  MongoDB connected
  ```

- Application is now live and accessible via the Render URL.

---

## 🔄 Continuous Deployment

- Any changes pushed to the **main branch** on GitHub automatically trigger a **redeployment on Render**.
- Environment variables are managed securely via the Render dashboard.

---

## 🧪 Testing

All APIs were tested using **Postman** after deployment to ensure:

- Authentication works correctly
- Role-based access control is enforced
- Database operations succeed

---

## 👨‍💻 Author

**Vishnu Prabhakar**
B.Tech – AI & Data Science
Backend Developer (Node.js, MongoDB)

---

## 📌 Notes for Recruiters / Interviewers

- This is a **fully deployed backend project**, not just a local setup.
- Demonstrates real-world skills in:

  - Backend development
  - Cloud deployment
  - Environment-based configuration
  - Database security & access control

Feel free to test the APIs using the live URL above.
