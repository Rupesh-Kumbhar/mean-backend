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

module.exports = router;
