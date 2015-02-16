/**
 * Created by Bashar Shrah on 2/15/2015.
 */
var express = require('express');
var models  = require('..\\models');
var db  = require('..\\models\\index.js');
var router = express.Router();
router.get('/', function(req, res) {
    res.render('index', { title: 'Company API' });
});

router.post('/', function (req,res) {
    //console.log(req.body.employees[0])
    if(req.body.employees){
        var data= [];
        for (index in req.body.employees){
            data.push(req.body.employees[index]);
        }
        var re=[];
        var count=0;
        for(i in data) {
            db.sequelize.transaction(function (t) { // Note that we use a callback rather than a promise.then()
                return models.employees.create(data[i], {transaction: t}).then(function (user) {
                    return user.update({deptID: 2}, {transaction: t}).then(function (user) {
                        return user.update({lastName: "Shrah"}, {transaction: t}).then(function (user) {
                            return user.update({firstName: "bashar"}, {transaction: t})
                        });
                    });
                });
            }).then(function (result) {
                re.push(result);
                count++;
                if(count==data.length){
                    res.json(re);
                }
            }).catch(function (err) {
                if(count==0){
                    res.json(err);
                    count++;
                }

            });
        }
    }
     if(req.body.Dept){
        console.log("works");
    }

});



module.exports = router;





/* var data={
 firstName:obj[0].firstName,
 lastName:obj[0].lastName,
 address:obj[0].address,
 phone:obj[0].phone,
 projectID:obj[0].projectID,
 deptID:obj[0].deptID
 };*/
/* var rea=[];
 var count=0;
 data.forEach(function (item) {
 db.sequelize.transaction(function (t) { // Note that we use a callback rather than a promise.then()
 return models.employees.create(item, {transaction: t}).then(function (user) {
 return user.update({deptID: 2}, {transaction: t}).then(function (user) {
 return user.update({lastName: "Shrah"}, {transaction: t}).then(function (user) {
 return user.update({firstName: "bashar"}, {transaction: t})
 });
 });
 });
 }).then(function (result) {
 count++;
 rea.push(result);
 if(count==data.length){
 res.json(rea);

 }
 }).catch(function (err) {
 res.json(err);
 return false;
 });
 });*/