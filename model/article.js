const sequelize = require('sequelize')
const conn = require('../config/db')

const article = conn.define('article', {

    title: sequelize.STRING,
    author: sequelize.STRING,
    content: sequelize.STRING
}, {

    timestamps: false
})

module.exports = article