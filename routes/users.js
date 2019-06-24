const multer     = require('multer')
const Datauri    = require('datauri')
const path       = require('path')
const storage    = multer.memoryStorage()
const cloudinary = require('../config/cloudinary')

const multerUploads = multer({storage:storage}).single('avatar')
const multerUploadsArray = multer({storage:storage}).array('photos', 2)

const dUri = new Datauri()
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);  
const dataUriArray = (req, i) => dUri.format(path.extname(req.files[i].originalname).toString(), req.files[i].buffer);

var express = require('express')
var router = express.Router();

var users = require('../model/users')
var bcrypt = require('bcrypt-nodejs')

// Show all users
router.get('/', (req, res) => {

  var _allUsers = users.findAll().then(result => {

    res.json({

      users : result
    })
  })
})

// Registrasi router
router.post('/register', (req, res) => {
  
  var name = req.body.name
  var email = req.body.email
  var password = bcrypt.hashSync(req.body.password)
  var image = "https://www.searchpng.com/wp-content/uploads/2019/02/Deafult-Profile-Pitcher.png"

  users.create({

    name: name,
    email: email,
    password: password,
    remember_tokenL: '',
    image: image
  }).then(result => {

    res.json({

      message: 'Success'
    })

  }).catch(err => console.log(err))

})

// Login router
router.post('/login', (req, res) => {

  var id = req.body.id
  var name = req.body.name
  var email = req.body.email
  var password = req.body.password

  users.findOne({

    where: {
      
      email: email
    }
  }).then(result => {

    id = result.id
    name = result.name

    if (!result) {

      console.log(req.body);

      res.json({

        'message' : 'Email tidak ditemukan'
      })
    } else {

      if (bcrypt.compareSync(password, result.password)) {

        // Login
        var generate_token = bcrypt.hashSync(email)

        users.update({

          remember_token: generate_token
        }, {

          where: {
            
            email : email
          }
        }).then(result => {

          res.json({
            
            id : id,
            name : name,
            email : email,
            generate_token : generate_token
          })
        }).catch(err => console.log(err))
      }
      else {

        // Password tidak sama
        res.status(401).json({

          'message' : 'Password salah!'
        })
      }
    }

  }).catch(err => console.log(err))

})

// Logout route
router.post('/logout', (req, res) => {

  var require_token = req.body.generate_token

  users.update({

    remember_token: ''
  }, {

    where: {

      remember_token: require_token
    }
  }).then(result => {

    res.json({

      message: 'Berhasil Logout'
    })

  }).catch(err => console.log(err))

})

router.post('/updateavatar/:id', multerUploads, (req, res) => {

  let file = dataUri(req).content

  cloudinary.v2.uploader.upload(file, (err, imageCloud) => {
    console.log('imageCloud ', imageCloud)
    console.log('error ', err)

    users.update({
      image: imageCloud.url
    }, {
      where: { id: req.params.id }
    })

    .then(function(rowsUpdate) {

      res.json({ status: "Success upload avatar!" })
    })
  })
})

router.post('/uploadphotos/:id', multerUploadsArray, (req, res) => {

  for (i = 0; i < 2; i++) {
    
    let files = dataUriArray(req, i).content
    console.log(files)
  }  

  res.json({ status: "Success upload files!" })

  // cloudinary.v2.uploader.upload(file, (err, imageCloud) => {
  //   console.log('imageCloud ', imageCloud)
  //   console.log('error ', err)

  //   users.update({
  //     image: imageCloud.url
  //   }, {
  //     where: { id: req.params.id }
  //   })

  //   .then(function(rowsUpdate) {

  //     res.json({ status: "Success!" })
  //   })
  // })
})

// Delete User by Id
router.delete('/delete/:id', (req, res) => {

  var tempId = req.params.id
  users.destroy({

    where: {
      id : tempId
    }

  }).then(result => {

    res.json({

      message: 'Berhasil menghapus'
    })
  })
})

module.exports = router