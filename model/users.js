const sequelize = require('sequelize')
const conn = require('../config/db')

const users = conn.define('users', {

    name : sequelize.STRING,
    email : sequelize.STRING,
    password:  sequelize.STRING,
    remember_token : sequelize.STRING,
    image: sequelize.STRING,
    background: sequelize.STRING,
    bukti: sequelize.STRING
}, {
    
    timestamps : false
})

module.exports = users