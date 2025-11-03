/** Import dari model */
const userModel = require(`../models/index`).user
const md5 = require(`md5`)

/** menyimpan Sequel  */
const Op = require(`sequelize`).Op

/** Fungsi untuk membaca semua data */
exports.getAllUser = async (request, response) => {
    /** call findAll() to get all data */
    let users = await userModel.findAll()
    return response.json({
        success: true,
        data: users,
        message: `All users have been loaded`
    })
}/** Fungsi untuk menyaring */
exports.findUser = async (request, response) => {  /** define keyword to find data */
    let keyword = request.params.key

    /** Mencari semua data user   */
    let users = await userModel.findAll({
        where: {
            [Op.or]: [
                { userID: { [Op.substring]: keyword } },
                { username: { [Op.substring]: keyword } },
                { name: { [Op.substring]: keyword } },
                { email: { [Op.substring]: keyword } },
                { role: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: users,
        message: `All Users have been loaded`
    })
}/** Post untuk menambah user */
exports.addUser = (request, response) => {
    /** request data */
    let newUser = {
        usernamename: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        password: md5(request.body.password),
        role: request.body.role
    }

    /** Eksekusi data dari kolom ke user */
    userModel.create(newUser)  .then(result => {
            /** Respon jika masukan data user sukses */
            return response.json({
                success: true,
                data: result,
                message: `New user has been inserted`
            })
        })
        .catch(error => {
            /** Jika Gagal */
            return response.json({
                success: false,
                message: error.message
            })
        })
}/** Fungsi Untuk Update user*/
exports.updateUser = (request, response) => {
    /** Persiapan data ketika diganti(UPDATE) */
    let dataUser = {
        username: request.body.username,
        name: request.body.name,
        email: request.body.email,
        role: request.body.role
    }
    if (request.body.password) {
        dataUser.password = md5(request.body.password)
    }
    /** Meminta ID user untuk update */
    let userID = request.params.id

    /** Mengeksekusi data user ketika diupdate */
    userModel.update(dataUser, { where: { userID : userID } })
        .then(result => {
        /** Jika Update Sukses */   
             return response.json({
                success: true,
                message: `Data user has been updated`
            })
        })
        .catch(error => {
            /** Jika Update Gagal */
            return response.json({
                success: false,
                message: error.message
            })
        })
}/** Fungsi untuk mendelete data user  */
exports.deleteUser = (request, response) => {
    /** Memnita request data ID dari User */
    let userID = request.params.id

    /** Melakukan Penghapusan untuk data user */
    userModel.destroy({ where: { userID: userID } })
        .then(result => {
            /** Jika update sukses*/
            return response.json({
                success: true,
                message: `Data user has been deleted`
            })
        })
        .catch(error => {
            /** Jika Update Gagal */
            return response.json({
                success: false,
                message: error.message
            })
        })
}