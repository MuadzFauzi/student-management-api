/**
 * Student Management API - Data Store
 *
 * Modul ini berfungsi sebagai database dalam memori untuk menyimpan data mahasiswa.
 * Array students akan berisi objek dengan struktur berikut:
 * {
 *   id: string (UUID, otomatis dibuat),
 *   name: string (nama mahasiswa),
 *   nim: string (nomor induk mahasiswa),
 *   jurusan: string (jurusan/program studi),
 *   semester: number (semester saat ini),
 *   email: string (email mahasiswa),
 *   createdAt: string (waktu ditambahkan),
 *   updatedAt: string (waktu diperbarui)
 * }
 */

const students = [];

module.exports = students;
