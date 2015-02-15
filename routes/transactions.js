/**
 * Created by Bashar Shrah on 2/15/2015.
 */
var express = require('express');
var models  = require('..\\models');
var db  = require('..\\models\\index.js');
var router = express.Router();
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Company API' });
});

router.post('/', function (req,res) {
    var data={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        address:req.body.address,
        phone:req.body.phone,
        projectID:req.body.projectID,
        deptID:req.body.deptID
    };
    db.sequelize.transaction(function (t) { // Note that we use a callback rather than a promise.then()
          return models.employees.create(data, { transaction: t}).then(function (user) {
          return user.update({deptID: 2}, { transaction: t}).then(function (user) {
              return user.update({lastName: "Shrah"}, { transaction: t}).then(function (user) {
                  return user.update({firstName:"bashar"}, { transaction: t})
              });
          });
        });
    }).then(function (result) {
        res.json(result)
    }).catch(function (err) {
        res.statusCode=400;
        res.json(err);
    });
});


module.exports = router;