/**
 * Student Management API - Controller
 *
 * Modul ini berisi semua fungsi handler untuk endpoint Student API.
 * Setiap handler mengimplementasikan logika bisnis dan aturan validasi.
 */

const { v4: uuidv4 } = require("uuid");
const students = require("../data/students");

/**
 * Menambahkan mahasiswa baru
 * POST /students
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 *
 * Validasi:
 * - name wajib diisi
 * - nim wajib diisi
 * - jurusan wajib diisi
 */
const addStudent = (req, res) => {
  const { name, nim, jurusan, semester, email } = req.body;

  // Validasi: name wajib diisi
  if (!name) {
    return res.status(400).json({
      status: "fail",
      message: "Gagal menambahkan mahasiswa. Mohon isi nama mahasiswa",
    });
  }

  // Validasi: nim wajib diisi
  if (!nim) {
    return res.status(400).json({
      status: "fail",
      message: "Gagal menambahkan mahasiswa. Mohon isi NIM",
    });
  }

  // Validasi: jurusan wajib diisi
  if (!jurusan) {
    return res.status(400).json({
      status: "fail",
      message: "Gagal menambahkan mahasiswa. Mohon isi jurusan",
    });
  }

  // Cek apakah NIM sudah ada
  const existingStudent = students.find((s) => s.nim === nim);
  if (existingStudent) {
    return res.status(400).json({
      status: "fail",
      message: "Gagal menambahkan mahasiswa. NIM sudah terdaftar",
    });
  }

  const id = uuidv4();
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newStudent = {
    id,
    name,
    nim,
    jurusan,
    semester: semester || 1,
    email: email || "",
    createdAt,
    updatedAt,
  };

  students.push(newStudent);

  return res.status(201).json({
    status: "success",
    message: "Mahasiswa berhasil ditambahkan",
    data: {
      studentId: id,
    },
  });
};

/**
 * Mendapatkan semua data mahasiswa
 * GET /students
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 *
 * Query Parameters (opsional):
 * - name: Filter berdasarkan nama (tidak case sensitive)
 * - jurusan: Filter berdasarkan jurusan
 */
const getAllStudents = (req, res) => {
  const { name, jurusan } = req.query;

  let filteredStudents = students;

  if (name) {
    filteredStudents = filteredStudents.filter((s) =>
      s.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (jurusan) {
    filteredStudents = filteredStudents.filter((s) =>
      s.jurusan.toLowerCase().includes(jurusan.toLowerCase())
    );
  }

  return res.status(200).json({
    status: "success",
    data: {
      students: filteredStudents,
    },
  });
};

/**
 * Mendapatkan detail mahasiswa berdasarkan ID
 * GET /students/:id
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getStudentById = (req, res) => {
  const { id } = req.params;

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      status: "fail",
      message: "Mahasiswa tidak ditemukan",
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
};

/**
 * Memperbarui data mahasiswa berdasarkan ID
 * PUT /students/:id
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 *
 * Validasi:
 * - name wajib diisi
 * - nim wajib diisi
 * - jurusan wajib diisi
 * - ID harus ditemukan
 */
const updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, nim, jurusan, semester, email } = req.body;

  // Validasi: name wajib diisi
  if (!name) {
    return res.status(400).json({
      status: "fail",
      message: "Gagal memperbarui mahasiswa. Mohon isi nama mahasiswa",
    });
  }

  // Validasi: nim wajib diisi
  if (!nim) {
    return res.status(400).json({
      status: "fail",
      message: "Gagal memperbarui mahasiswa. Mohon isi NIM",
    });
  }

  // Validasi: jurusan wajib diisi
  if (!jurusan) {
    return res.status(400).json({
      status: "fail",
      message: "Gagal memperbarui mahasiswa. Mohon isi jurusan",
    });
  }

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Gagal memperbarui mahasiswa. ID tidak ditemukan",
    });
  }

  const updatedAt = new Date().toISOString();

  students[index] = {
    ...students[index],
    name,
    nim,
    jurusan,
    semester: semester || students[index].semester,
    email: email || students[index].email,
    updatedAt,
  };

  return res.status(200).json({
    status: "success",
    message: "Mahasiswa berhasil diperbarui",
  });
};

/**
 * Menghapus data mahasiswa berdasarkan ID
 * DELETE /students/:id
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteStudent = (req, res) => {
  const { id } = req.params;

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Gagal menghapus mahasiswa. ID tidak ditemukan",
    });
  }

  students.splice(index, 1);

  return res.status(200).json({
    status: "success",
    message: "Mahasiswa berhasil dihapus",
  });
};

module.exports = {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
