/** Import dari model */
const authmodel = require('../models').auth;
const md5 = require('md5');
const tokenauth = require('jsonwebtoken');

const secretKey = 'OTP2102';

/** Fungsi untuk login */
exports.login = async (request, response) => {
    /** request data dari body */
    let username = request.body.username;
    let password = md5(request.body.password);

    /** mencari data user berdasarkan username dan password */
    let user = await authmodel.findOne({
        where: { username: username, password: password }
    });
    if (user) {
        /** jika user ditemukan */
        return response.json({  
            success: true,
            data: user,
            message: 'Login sukses'
        });
    } else {
        /** jika user tidak ditemukan */
        return response.json({
            success: false,
            message: 'Kesalahan username or password'
        });
    }
};

/** Fungsi untuk register */
exports.register = async (request, response) => {
    /** request data dari body */
    let newUser = {
        username: request.body.username,
        password: md5(request.body.password)
    };

    /** menambahkan data user ke tabel auth */
    authmodel.create(newUser)
        .then(result => {
            /** Respon jika pendaftaran sukses */
            return response.json({
                success: true,
                data: result,
                message: 'Registration sukses'
            });
        })
        .catch(error => {
            /** Respon jika pendaftaran gagal */
            return response.json({
                success: false,
                message: error.message
            });
        });
};

exports.authorize = (request, response, next) => {
    let token = request.headers['authorization'];
    if (!token) {
        return response.status(403).json({
            success: false,
            message: 'Token tidak disediakan'
        });
    }
    token = token.replace('Bearer ', '');
    tokenauth.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: 'Gagal mengautentikasi token'
            });
        }
        request.userId = decoded.id;
        next();
    });
};


