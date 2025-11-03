const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensi.controller');

// Post untuk menambah presensi baru
router.post('/', presensiController.addPresensi);
// Get untuk mendapatkan semua presensi
router.get('/', presensiController.getAllPresensi);
// Get untuk mendapatkan presensi berdasarkan userID
router.get('/user/:userID', presensiController.getPresensiByUserID);
//Put untuk update presensi
router.put('/:id', presensiController.updatePresensi);
//Delete untuk menghapus presensi
router.delete('/:id', presensiController.deletePresensi);

module.exports = router;

