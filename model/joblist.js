const sequelize = require('sequelize')
const conn = require('../config/db')

const joblist = conn.define('joblist', {

    id_users : sequelize.STRING,
    id_jobs : sequelize.STRING    
}, {

    timestamps : false
})

module.exports = joblist