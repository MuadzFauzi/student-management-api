/**
 * Student Management API - Routes
 *
 * Modul ini mendefinisikan semua rute yang tersedia:
 * - POST   /students       : Menambahkan mahasiswa baru
 * - GET    /students       : Mendapatkan semua data mahasiswa
 * - GET    /students/:id   : Mendapatkan detail mahasiswa berdasarkan ID
 * - PUT    /students/:id   : Memperbarui data mahasiswa berdasarkan ID
 * - DELETE /students/:id   : Menghapus data mahasiswa berdasarkan ID
 */

const express = require("express");
const router = express.Router();
const {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// CREATE - Menambahkan mahasiswa baru
router.post("/", addStudent);

// READ - Mendapatkan semua mahasiswa
router.get("/", getAllStudents);

// READ - Mendapatkan mahasiswa berdasarkan ID
router.get("/:id", getStudentById);

// UPDATE - Memperbarui data mahasiswa
router.put("/:id", updateStudent);

// DELETE - Menghapus data mahasiswa
router.delete("/:id", deleteStudent);

module.exports = router;
