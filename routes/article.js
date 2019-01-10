var express = require('express')
var router = express.Router();

var article = require('../model/article')

router.post('/create', (req, res) => {

    var title = req.body.title
    var imageurl = req.body.imageurl  
    var author = req.body.author
    var category = req.body.category
    var salary = req.body.salary
    var location = req.body.location
    var content_desc = req.body.content_desc

    article.create({

        title: title,
        imageurl: imageurl,      
        author: author,
        category: category,
        salary: salary,
        location: location,
        content_desc: content_desc
    }).then(result => {

        res.json({

         message : 'Berhasil'
        })

    }).catch(err => console.log(err))
})

router.get('/', (req, res) => {

    var _article = article.findAll({

        where: {

            imageurl: req.params.imageurl
        }
    }).then(result => {

        res.json({

            article : result
        })
    })
})


// Delete Article by Id
router.delete('/delete/:id', (req, res) => {

    var tempId = req.params.id
    article.destroy({

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