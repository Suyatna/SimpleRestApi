var express = require('express')
var router = express.Router();

var allUsers = require('../model/allUsers')
var bcrypt = require('bcrypt-nodejs')

var pencari_kerja = require('../model/pencari_kerja')
var users = require('../model/users')

// Show all users
router.get('/', (req, res) => {

    var _allUsers = allUsers.findAll({
        include: [
            { model: pencari_kerja },
            { model: users }
        ]
    }).then(result => {
  
      res.json({
  
        allUsers : result
      })
    })
  })