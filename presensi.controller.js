
const db = require('../models');

let {userID, date, time, status} = require('../seeders/users');

// fungsi untuk menambahkan presensi
exports.addPresensi = async (request, response) => {
    try {
        let newPresensi = {
            userID: request.body.userID,
            date: request.body.date,
            time: request.body.time,
            status: request.body.status
        };

        let presensi = await db.presensi.create(newPresensi);

        return response.json({  
            success: true,
            data: presensi,
            message: 'Presensi has been added'
        });
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        });
    }

};

// fungsi untuk mendapatkan semua presensi
exports.getAllPresensi = async (request, response) => {
    try {
        let presensis = await db.presensi.findAll({
            include: [{
                model: db.user,
                as: 'user'
            }]
        });

        return response.json({  
            success: true,
            data: presensis,
            message: 'All presensi have been loaded'
        });
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        });
    }
};

// fungsi untuk mendapatkan presensi berdasarkan userID
exports.getPresensiByUserID = async (request, response) => {
    try {
        let userID = request.params.userID;
        let presensis = await db.presensi.findAll({
            where: { userID: userID },
            include: [{
                model: db.user,
                as: 'user'
            }]
        });
        return response.json({  
            success: true,
            data: presensis,
            message: `Presensi for userID ${userID} have been loaded`
        });
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        });
    }
};

// fungsi untuk memperbarui presensi
exports.updatePresensi = async (request, response) => {
    try {
        let id = request.params.id;
        let dataPresensi = {
            userID: request.body.userID,
            date: request.body.date,
            time: request.body.time,
            status: request.body.status
        };

        let result = await db.presensi.update(dataPresensi, {
            where: { id: id }
        });

        return response.json({
            success: true,
            data: result,
            message: `Presensi with id ${id} has been updated`
        });
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        });
    }

};


// fungsi untuk menghapus presensi
exports.deletePresensi = async (request, response) => {
    try {
        let id = request.params.id;
        await db.presensi.destroy({
            where: { id: id }
        });
        return response.json({
            success: true,
            message: `Presensi with id ${id} has been deleted`
        });
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        });
    }
};

