const sequelize = require('sequelize')
const conn = require('../config/db')

const article = conn.define('jobs', {

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

module.exports = article