const sequelize = require('sequelize')
const conn = require('../config/db')
const pencari_kerja = require('./pencari_kerja')
const users = require('./users')

const allUsers = conn.define('allUsers', {

    id_allUsers: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    levelUsers: sequelize.ENUM('admin', 'pencari_kerja', 'pemberi_kerja'),
    id_pencari_kerja: sequelize.INTEGER,
    id_users: sequelize.INTEGER
}, {
    timestamps: false
});

allUsers.belongsToMany(pencari_kerja, { through: 'pencari_kerja', foreignKey: 'id_pencari_kerja'})
allUsers.belongsToMany(users, { through: 'users', foreignKey: 'id_users' })

module.exports = allUsers