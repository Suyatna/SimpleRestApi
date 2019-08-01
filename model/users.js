const sequelize = require('sequelize')
const conn = require('../config/db')

const users = conn.define('users', {

    id_users: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    levelUsers: sequelize.ENUM('admin', 'pencari_kerja', 'pemberi_kerja'),
    name : sequelize.STRING,
    email : sequelize.STRING,
    password:  sequelize.STRING,
    remember_token : sequelize.STRING,
    avatar: sequelize.STRING,
    alamat: sequelize.STRING,
    pendidikan_terakhir: sequelize.STRING,
    cv: sequelize.STRING
}, {
    
    timestamps : false
})

module.exports = users