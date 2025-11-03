const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Get untuk mendapatkan semua user
router.get('/', userController.getAllUser);
// Get untuk mencari user berdasarkan keyword
router.get('/find/:key', userController.findUser);
//Post untuk menambah user baru
router.post('/', userController.addUser);

//Put untuk update user
router.put('/:id', userController.updateUser);
//Delete untuk menghapus user
router.delete('/:id', userController.deleteUser);

module.exports = router;

