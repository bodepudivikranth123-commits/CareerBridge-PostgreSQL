# 🎓 CareerBridge - DBMS Placement Management System

<p align="center">

A **Database Management System (DBMS)** project that automates the campus placement process using **PostgreSQL**.  
CareerBridge demonstrates the practical implementation of **Relational Database Design, SQL Programming, Triggers, Views, Stored Procedures, Functions, and REST APIs** in a real-world Placement Management System.

</p>

---

## ✨ Project Highlights

- 🎯 Complete Placement Management System
- 🗄️ PostgreSQL Relational Database
- 🔑 Automatic ID Generation using Identity Columns
- 🔄 Full CRUD Operations
- 📊 Placement Reports & Analytics
- ⚡ REST API using Express.js
- ☁️ PostgreSQL hosted on **Neon**
- 🚀 Backend deployed on **Render**
- 🌐 Frontend deployed on **Vercel**

---

# 📚 DBMS Concepts Implemented

| Concept | Status |
|---------|:------:|
| Relational Database Design | ✅ |
| Normalization | ✅ |
| Primary & Foreign Keys | ✅ |
| Constraints | ✅ |
| Identity Columns | ✅ |
| Joins | ✅ |
| Aggregate Queries | ✅ |
| Nested Queries | ✅ |
| Views | ✅ |
| Stored Procedures | ✅ |
| Functions | ✅ |
| Triggers | ✅ |
| CRUD Operations | ✅ |
| REST API Integration | ✅ |

---

# 🏗 Database Schema

The system consists of the following relational tables:

- 📘 Departments
- 👨‍🎓 Students
- 🏢 Companies
- 💼 Job Roles
- 📅 Placement Drives
- 📝 Applications
- 🎉 Offers
- 📈 Student CGPA Log

---

# ⚙️ Tech Stack

## Database

- PostgreSQL
- Neon Database

## Backend

- Node.js
- Express.js
- pg
- dotenv
- CORS

## Frontend

- HTML5
- CSS3
- JavaScript

## Deployment

- Render
- Vercel

---

# 📂 Project Structure

```text
CareerBridge-PostgreSQL
│
├── backend
│   ├── routes
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── SQL
│   ├── 01_create_tables.sql
│   ├── 02_insert_data.sql
│   ├── 03_queries.sql
│   ├── 04_views.sql
│   ├── 05_procedures.sql
│   ├── 06_functions.sql
│   └── 07_triggers.sql
│
└── README.md
```

---

# 📋 Features

## 👨‍🎓 Student Module

- Add Student
- Update Student
- Delete Student
- View Student Records

---

## 🏢 Department Module

- Add Department
- Update Department
- Delete Department

---

## 💼 Company Module

- Company Management
- Job Role Management
- Placement Drive Scheduling

---

## 📝 Placement Module

- Student Applications
- Offer Management
- Placement Reports

---

# 📊 Reports

The system generates reports such as:

- 📈 Students by Department
- 💰 Highest Package Offered
- 🎓 Average Student CGPA
- 🏢 Company-wise Applications
- 📅 Upcoming Placement Drives
- ⭐ Above Average Salary Roles
- 🎉 Total Offers
- ✅ Selected Students

---

# 🔌 REST API Endpoints

| Module | Endpoints |
|---------|-----------|
| Students | GET • POST • PUT • DELETE |
| Departments | GET • POST • PUT • DELETE |
| Companies | GET • POST • PUT • DELETE |
| Job Roles | GET • POST • PUT • DELETE |
| Drives | GET • POST • PUT • DELETE |
| Applications | GET • POST • PUT • DELETE |
| Offers | GET • POST • PUT • DELETE |
| Reports | GET |

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/your-username/CareerBridge-PostgreSQL.git
```

Move to backend

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env`

```env
DATABASE_URL=YOUR_NEON_DATABASE_URL
PORT=3000
```

Run

```bash
node server.js
```

---

# 🎯 Learning Outcomes

This project demonstrates practical knowledge of:

- Relational Database Design
- PostgreSQL
- Database Normalization
- SQL Programming
- Trigger Programming
- Stored Procedures
- Functions
- Views
- Backend Database Connectivity
- REST API Development
- Cloud Database Deployment

---

# 📌 Future Improvements

- 🔐 User Authentication
- 📄 Resume Upload
- 📧 Email Notifications
- 📈 Dashboard Charts
- 👨‍💼 Company Portal
- 🎓 Student Login

---

# 👨‍💻 Author

**Vikranth Bodepudi**

**CareerBridge** was developed as an academic **Database Management System (DBMS)** project to demonstrate the practical implementation of PostgreSQL database concepts through a real-world Placement Management System.

⭐ If you found this project interesting, consider giving it a **Star** on GitHub!
