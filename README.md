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
| Action             | Admin | Manager | Employee |
| ------------------ | ----- | ------- | -------- |
| Create task        | ✅     | ✅       | ❌        |
| Assign task        | ❌     | ✅       | ❌        |
| View own tasks     | ❌     | ❌       | ✅        |
| View all tasks     | ✅     | ✅       | ❌        |
| Update task status | ❌     | ❌       | ✅        |
| Delete task        | ✅     | ❌       | ❌        |
