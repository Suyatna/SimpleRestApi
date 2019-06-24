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

  users.create({

    name: name,
    email: email,
    password: password,
    remember_tokenL: ''
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