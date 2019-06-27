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
    }).catch(err => console.log(err))
})

module.exports = router