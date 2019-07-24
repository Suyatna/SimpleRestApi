const sequelize = require('sequelize')
const conn = require('../config/db')

const jobs = conn.define('jobs', {

    id_jobs: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    title: sequelize.STRING,
    imageurl: sequelize.STRING,
    author: sequelize.STRING,
    category: sequelize.STRING,
    salary: sequelize.STRING,
    location: sequelize.STRING,
    content_desc: sequelize.STRING,
    date_created : sequelize.STRING,
    uri_form : sequelize.STRING
}, {

    timestamps : false
})

module.exports = jobs