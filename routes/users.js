var express = require('express')
var router = express.Router();

var users = require('../model/users')
var bcrypt = require('bcrypt-nodejs')

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');
});

// Show all users
router.post('/users', (req, res) => {

  var name = req.body.name
  var email = req.body.email
  
  users.create({

    name: name,
    email: email
  }).then(result => {

    res.json({

      message : 'Berhasil'
    })

  }).catch(err => console.log(err))
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

  var email = req.body.email
  var password = req.body.password

  users.findOne({

    where: {
      
      email: email
    }
  }).then(result => {

    if (!result) {

      res.json({

        'message' : 'Email tidak ditemukan'
      })
    }
    else {

      if (bcrypt.compareSync(password, result.password)) {

        // Login
        var generate_token = bcrypt.hashSync(email)

        users.update({

          remember_token: generate_token
        }, {

          where: {

            email: email
          }
        }).then(result => {

          res.json({

            generate_token: generate_token
          })
        }).catch(err => console.log(err))
      }
      else {

        // Password tidak sama
        res.json({

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

module.exports = router;