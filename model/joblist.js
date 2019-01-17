const sequelize = require('sequelize')
const conn = require('../config/db')

const joblist = conn.define('users', {

    id_users : sequelize.STRING,
    id_jobs : sequelize.STRING,
    cv : sequelize.STRING
}, {

    timestamps : false
})

module.exports = joblist