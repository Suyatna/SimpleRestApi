const multer     = require('multer')
const Datauri    = require('datauri')
const path       = require('path')
const storage    = multer.memoryStorage()
const cloudinary = require('../config/cloudinary')

const multerUploads = multer({storage:storage}).single('avatar')

const dUri = new Datauri()
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);  

var express = require('express')
var router = express.Router();

var pencari_kerja = require('../model/pencari_kerja')
var bcrypt = require('bcrypt-nodejs')

// Show all pencari_kerja
router.get('/', (req, res) => {

    var _allPencariKerja = pencari_kerja.findAll().then(result => {

        res.json({

            pencari_kerja : result
        })
    })
})

// Registrasi router
router.post('/register', (req, res) => {
  
    var name = req.body.name
    var email = req.body.email
    var password = bcrypt.hashSync(req.body.password)
    var avatar = "https://www.searchpng.com/wp-content/uploads/2019/02/Deafult-Profile-Pitcher.png"
  
    users.create({
  
      name: name,
      email: email,
      password: password,
      remember_tokenL: '',
      avatar: avatar
    }).then(result => {
  
      res.json({
  
        message: 'Success'
      })
  
    }).catch(err => console.log(err))
  
  })

module.exports = router