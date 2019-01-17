const sequelize = require('sequelize')
const conn = require('../config/db')

const jobs = conn.define('jobs', {

    title: sequelize.STRING,
    imageurl: sequelize.STRING,
    author: sequelize.STRING,
    category: sequelize.STRING,
    salary: sequelize.STRING,
    location: sequelize.STRING,
    content_desc: sequelize.STRING
}, {

    timestamps: false    
})

module.exports = jobs