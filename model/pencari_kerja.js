const sequelize = require('sequelize')
const conn = require('../config/db')

const pencari_kerja = conn.define('pencari_kerja', {

    id_pencari_kerja: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: sequelize.STRING,
    email: sequelize.STRING,
    password: sequelize.STRING,
    remember_token: sequelize.STRING,
    avatar: sequelize.STRING,
    alamat: sequelize.STRING,
    pendidikan_terakhir: sequelize.STRING,
    cv: sequelize.STRING
}, {
    timestamps: false
});

module.exports = pencari_kerja