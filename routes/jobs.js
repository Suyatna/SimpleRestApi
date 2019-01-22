var express = require('express')
var router = express.Router();

var jobs = require('../model/jobs')

router.post('/create', (req, res) => {

    var title = req.body.title
    var imageurl = req.body.imageurl  
    var author = req.body.author
    var category = req.body.category
    var salary = req.body.salary
    var location = req.body.location
    var content_desc = req.body.content_desc
    var date_created = req.body.date_created
    var uri_form = req.body.uri_form

    jobs.create({

        title : title,
        imageurl : imageurl,      
        author : author,
        category : category,
        salary : salary,
        location : location,
        content_desc : content_desc,
        date_created : date_created,
        uri_form : uri_form
    }).then(result => {

        res.json({

         message : 'Berhasil'
        })

    }).catch(err => console.log(err))
})

router.get('/', (req, res) => {

    var _jobs = jobs.findAll().then(result => {

        res.json({

            jobs : result

        }).catch(err => console.log(err))
    })
})


// Delete Jobs by Id
router.delete('/delete/:id', (req, res) => {

    var tempId = req.params.id
    jobs.destroy({

        where: {
            id : tempId
        }

    }).then(result => {

        res.json({

            message: 'Berhasil menghapus'
        })

    }).catch(err => console.log(err))
})

module.exports = router