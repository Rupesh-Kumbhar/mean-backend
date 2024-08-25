// const express = require('express');
// const router = express.Router();
// const Employee = require('../models/employee.js');


// // get put post delete
// //  /employees...see index.js


// router.post('/employee',(req,res)=>{
//     let emp = new Employee({
//     name :  req.body.name,
//     position:  req.body.position,
//     dept: req.body.dept
//     });

//     emp.save((err, doc)=>{
//         if(err){
//             console.log('Error in post data' + err)
//         }
//         else{
//             res.send(doc);
//         }
//     })

// });


// module.exports = router; 

const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.js');
const ObjectId = require('mongoose').Types.ObjectId;

// POST request to add a new employee
router.post('/employee', async (req, res) => {
    let emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        dept: req.body.dept
    });

    try {
        const doc = await emp.save();
        res.send(doc);
    } catch (err) {
        console.log('Error in post data: ' + err);
        res.status(500).send(err);
    }
});


// GET request to add a new employee

router.get('/list', (req, res) => {
    Employee.find().exec()
        .then(docs => {
            res.send(docs);
        })
        .catch(err => {
            console.log('Error in retrieving data: ' + err);
            res.status(500).send({ error: 'Failed to retrieve employee data', details: err });
        });
});


//get by id
router.get('/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Employee.findById(req.params.id).exec()
            .then(doc => {
                if (doc) {
                    res.send(doc);
                } else {
                    res.status(404).send('No record found with ID ' + req.params.id);
                }
            })
            .catch(err => {
                console.log('Error in Get Employee by ID: ' + err);
                res.status(500).send({ error: 'Failed to retrieve employee data', details: err });
            });
    } else {
        return res.status(400).send('Invalid ID format: ' + req.params.id);
    }
});


//Delete by id
router.delete('/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Employee.findByIdAndDelete(req.params.id).exec()
            .then(doc => {
                if (doc) {
                    res.send(doc);
                } else {
                    res.status(404).send('No record found with ID ' + req.params.id);
                }
            })
            .catch(err => {
                console.log('Error in Delete Employee by ID: ' + err);
                res.status(500).send({ error: 'Failed to retrieve employee data', details: err });
            });
    } else {
        return res.status(400).send('Invalid ID format: ' + req.params.id);
    }
});


//PUT Api

router.put('/:id', (req, res) => {
    let emp = {
        name: req.body.name,
        position: req.body.position,
        dept: req.body.dept
    };

    if (ObjectId.isValid(req.params.id)) {
        Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true })
            .then(doc => {
                if (!doc) {
                    return res.status(404).send('No record found with ' + req.params.id);
                }
                res.send(doc);
            })
            .catch(err => {
                console.log('Error in Update Employee by id: ' + err);
                res.status(500).send('Internal Server Error');
            });
    } else {
        return res.status(400).send('No record found with ' + req.params.id);
    }
});



module.exports = router;
