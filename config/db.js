const sequelize = require('sequelize')
const conn = new sequelize('mysql://bbc3c590868bde:e5b0f6b2@us-cdbr-iron-east-01.cleardb.net/heroku_c76db9f7e02a1c6?reconnect=true')

// 

module.exports = conn