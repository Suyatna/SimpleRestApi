var express = require('express')
var router = express.Router();

var article = require('../model/article')

router.post('/article', (req, res) => {

    var title = req.body.title
    var author = req.body.author
    var content = req.body.content

    article.create({

        title: title,
        author: author,
        content: content        
    }).then(result => {

        res.json({

         message : 'Berhasil'
        })

    }).catch(err => console.log(err))
})

router.get('/', (req, res) => {

    var _article = article.findAll().then(result => {

        res.json({

            article : result
        })
    })
})


// Delete Article by Id
router.delete('/:id', (req, res) => {

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