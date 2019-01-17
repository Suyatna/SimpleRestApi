var express = require('express')
var router = express.Router();

var joblist = require('../model/joblist')

router.post('/create', (req, res) => {
    
    var id_users = req.body.id_users
    var id_jobs = req.body.id_jobs
    var cv = req.body.cv

    joblist.create({

        id_users : id_users,
        id_jobs : id_jobs,
        cv : cv
    }).then(result => {

        res.json({

            message : 'Berhasil'
        })

    }).catch(err => console.log(err))
})

router.get('/', (req, res) => {

    var _joblist = joblist.findAll().then(result => {

        res.json({

            joblist : result

        }).catch(err => console.log(err))
    })
})

// Delete Joblist by Id
router.delete('/delete/:id', (req, res) => {

    var tempId = req.params.id
    joblist.destroy({

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