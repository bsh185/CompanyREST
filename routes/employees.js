var express = require('express');
var models  = require('..\\models');
var router = express.Router();


/**
 * GET Handler
 */
router.get('/' , function(req,res){
    models.employees.findAll({
        include: [ models.departments ,models.projects]
    }).then(function (result){
        if(result){
            res.json(result);
        }
        else{
            res.statusCode=404;
            res.json({Message:"Company Has No Employees"})
        }

    }).catch(function(err){
        res.json(err);
    })
});
/**
 * GET Employee By ID
 */
router.get('/:id', function (req, res) {
   var ID=req.params.id;
    models.employees.find({include :[models.departments , models.projects],where:{ID:ID}}).then(function (result) {
        if(result){
            res.json(result);
        }
        else{
            res.statusCode=404;
            res.json({Message:"Employee ID Doesn't Exist"})
        }

    }).catch(function (err) {
        res.statusCode=400;
        res.json(err);
    })
});
/**
 * POST Handler
 */
router.post('/',  function(req,res){
    var data={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        address:req.body.address,
        phone:req.body.phone,
        projectID:req.body.projectID,
        deptID:req.body.deptID
    };
    console.log(data);
    models.employees.create(data).then(function(result){
        res.json(result);
    }).catch(function(err){
        console.log(err);
        res.statusCode=400;
        res.json(err);
    })
});

/**
 * PUT Handler
 */
router.put('/',function(req,res){
    var data={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        address:req.body.address,
        phone:req.body.phone,
        projectID:req.body.projectID,
        deptID:req.body.deptID
    };
    models.employees.update(data,{where:{ID:req.body.ID}}).then(function(result){
        if(result>0){
            res.json({Message:"Employee Updated"});
        }
        else{
            res.statusCode = 404;
            res.json({Message:"Employee ID Doesn't Exist"})
        }

    }).catch(function(err){
        res.statusCode=400;
        res.json(err);
    })
});

/**
 * PATCH Handler
 */
router.patch('/', function (req,res) {
    var data = req.body;
    models.employees.update(data,{where:{ID:req.body.ID}}).then(function(result){
        if(result>0){
            res.json({Message:"Employee Updated"});
        }
        else{
            res.statusCode = 404;
            res.json({Message:"Employee ID Doesn't Exist"})
        }

    }).catch(function(err){
        res.statusCode=400;
        res.json(err);
    })
});

/**
 * DELETE Handler
 */
router.delete('/', function (req, res) {
    var ID = req.body.ID;
    models.employees.destroy({
        where :{ID:ID}
    }).then(function (result) {
        if(result>0){
            res.json({Message:"Employee Deleted"});
        }
        else{
            res.statusCode = 404;
            res.json({Message:"Employee ID Doesn't Exist"})
        }

    }).catch(function (err) {
        res.statusCode=400;
        res.json(err);
    })
});
module.exports = router;
