# 🎓 Student Management RESTful API

A lightweight, high-performance RESTful API designed to manage student records. Built with **Node.js** and **Express.js**, this project serves as a showcase of clean code architecture, robust CRUD operations, and systematic API testing methodologies.

---

## 🚀 Key Features

- **Full CRUD Implementation:** Seamlessly Create, Read, Update, and Delete student records.
- **MVC Architecture:** Structured with a strict separation of concerns (Routes, Controllers, and Data Layer) to ensure scalability and maintainability.
- **In-Memory Data Management:** Utilizing a lightweight in-memory data store for fast execution and predictable state transitions during testing.
- **Comprehensive API Verification:** Pre-configured sequential testing workflow to guarantee endpoint integrity and accurate HTTP status code responses.

---

## 🛠️ Tech Stack

- **Runtime Environment:** Node.js
- **Backend Framework:** Express.js (v4.x)
- **API Testing & Documentation:** Postman
- **Version Control:** Git & GitHub

---

## 📁 Project Structure

The project follows a clean, modular directory layout to decouple business logic from routing configuration:

```text
student-management-api/
├── package.json
├── src/
│   ├── server.js              # Server entry point & Express configuration
│   ├── routes/
│   │   └── studentRoutes.js   # HTTP Method & URI definitions
│   ├── controllers/
│   │   └── studentController.js # Business logic, request handling, & data manipulation
│   └── data/
│       └── students.js        # In-memory data store & schema blueprint
└── .gitignore
```

## ⚙️ Getting Started

### Prerequisites
Ensure you have Node.js (v14.x or higher) and npm installed on your local machine.

### Installation

Clone the repository:Bash
```git
git clone https://github.com/MuadzFauzi/student-management-api.git
```

Navigate into the project directory:Bash
```git
cd student-management-api
```

Install the required dependencies:Bash
```git
npm install
```

### Running the Server

Start the Express server locally by executing:Bash
```git
npm start
```

Once started, the application will listen for requests at: http://localhost:3000

## 📋 API Specification & Endpoints

| Method | Endpoint | Description | Success Code |
| :---: | :---: | :---: | :---: |
| 1 | POST /students | Register a new student record | 201 Created |
| 2 | GET /students | Retrieve all registered students | 200 OK |
| 3 | GET /students/:id | Fetch details of a specific student by ID | 200 OK |
| 4 | PUT /students/:id | Update an existing student's details | 200 OK |
| 5 | DELETE /students/:id | Remove a student record from the system | 200 OK |

## Sample Payloads

1. Create Student (POST /students)

```json
{
    "name": "Ahmad",
    "nim": "4512424005",
    "jurusan": "Teknik Informatika",
    "semester": 6,
    "email": "[EMAIL_ADDRESS]"
}
```
Response (201 Created):
```json
{
    "status": "success",
    "message": "Mahasiswa berhasil ditambahkan",
    "data": {
        "studentId": "97800002-0001-4000-9000-000000000001"
    }
}
```

## 🧪 Automated & Manual Testing Workflow (Postman)

To maintain data integrity across the volatile in-memory storage, the API endpoints are verified using a strict 8-step sequential testing pipeline:

- Test 1 (POST): Seed the first student record (Ahmad) and extract the generated studentId.
- Test 2 (POST): Seed a second isolated record (Siti Nurhaliza) to test collection concurrency.
- Test 3 (GET): Fetch the entire collection to verify both records exist and are structured correctly.
- Test 4 (GET): Target the first student using the extracted ID to test parameterized filtering.
- Test 5 (PUT): Update the first student's state (e.g., incrementing semester and changing email).
- Test 6 (GET): Query the updated record to verify state persistence.
- Test 7 (DELETE): Purge the second student record using their specific ID.
- Test 8 (GET): Perform a final collection read to confirm successful data isolation and removal (ensuring only 1 record remains).