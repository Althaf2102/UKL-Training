'use strict';
let md5 = require('md5')
const now = new Date()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
 {
 username: "althafaraby",
 name: "Althaf",
 email: "fakhrizafaraby@gmail.com",
 password: md5("12345"),
 role : "Siswa",
 createdAt : now,
 updatedAt : now
 },
 {
 username: "harry slamet",
 name: "harry ",
 email: "harry@gmail.com",
 password: md5("12345"),
 role : "Guru",
 createdAt : now,
 updatedAt : now
 },
 {
 username: "roni Wijaya",
 name: "Roni",
 email: "ron@gmail.com",
 password: md5("12345"),
 role : "Siswa",
 createdAt : now,
 updatedAt : now
 }
]);
  },

  async down (queryInterface, Sequelize) {
    
  }
};
