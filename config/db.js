const sequelize = require('sequelize')
const conn = new sequelize('simple_api', 'root', '', {
    
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false
})

module.exports = conn