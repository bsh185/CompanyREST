/**
 * Created by Bashar Shrah on 2/14/2015.
 */
var express = require('express');
var models = require('../models');
var router = express.Router();


/**
 * GET Handler
 */
router.get('/', function (req, res) {
    models.departments.findAll({
        include: [models.employees]
    }).then(function (result) {
        if (result.length) {
            res.json(result);
        }
        else {
            res.statusCode = 404;
            res.json({Message: "Company Has No Departments"})
        }

    }).catch(function (err) {
        res.json(err);
    })
});
/**
 * GET Department By ID
 */
router.get('/:id', function (req, res) {
    var ID = req.params.id;
    models.departments.find({where: {ID: ID}, include: [models.employees]}).then(function (result) {
        if (result) {
            res.json(result);
        }
        else {
            res.statusCode = 404;
            res.json({Message: "Department ID Doesn't Exist"})
        }

    }).catch(function (err) {
        res.statusCode = 400;
        res.json(err);
    })
});
/**
 * POST Handler
 */
router.post('/', function (req, res) {
    var data = {
        department: req.body.department,
        location: req.body.location
    };
    models.departments.create(data).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        console.log(err);
        res.statusCode = 400;
        res.json(err);
    })
});

/**
 * PUT Handler
 */
router.put('/', function (req, res) {
    var data = {
        department: req.body.department,
        location: req.body.location
    };
    models.departments.update(data, {where: {ID: req.body.ID}}).then(function (result) {
        if (result > 0) {
            res.json({Message: "Department Updated"});
        }
        else {
            res.statusCode = 404;
            res.json({Message: "Departments ID Doesn't Exist"})
        }

    }).catch(function (err) {
        res.statusCode = 400;
        res.json(err);
    })
});

/**
 * PATCH Handler
 */
router.patch('/', function (req, res) {
    var data = req.body;
    models.departments.update(data, {where: {ID: req.body.ID}}).then(function (result) {
        if (result > 0) {
            res.json({Message: "Departments Updated"});
        }
        else {
            res.statusCode = 404;
            res.json({Message: "Department ID Doesn't Exist"})
        }

    }).catch(function (err) {
        res.statusCode = 400;
        res.json(err);
    })
});

/**
 * DELETE Handler
 */
router.delete('/', function (req, res) {
    var ID = req.body.ID;
    models.departments.destroy({
        where: {ID: ID}
    }).then(function (result) {
        if (result > 0) {
            res.json({Message: "Department Deleted"});
        }
        else {
            res.statusCode = 404;
            res.json({Message: "Department ID Doesn't Exist"})
        }
    }).catch(function (err) {
        res.statusCode = 400;
        res.json(err);
    })
});
module.exports = router;
