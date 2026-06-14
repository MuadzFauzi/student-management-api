/**
 * Student Management API
 *
 * Server utama untuk API Manajemen Data Mahasiswa.
 * Menggunakan Express.js dengan fitur:
 * - CORS diaktifkan untuk semua origin
 * - JSON body parser
 * - Endpoint CRUD untuk data mahasiswa
 *
 * Port: 3000
 */

const express = require("express");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Routes
app.use("/students", studentRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Student Management API",
    endpoints: {
      "POST /students": "Menambahkan mahasiswa baru",
      "GET /students": "Mendapatkan semua data mahasiswa",
      "GET /students/:id": "Mendapatkan detail mahasiswa berdasarkan ID",
      "PUT /students/:id": "Memperbarui data mahasiswa berdasarkan ID",
      "DELETE /students/:id": "Menghapus data mahasiswa berdasarkan ID",
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
