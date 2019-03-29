// const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.create = function (req, res, next) {
    const user = new User(req.body);
    user.save().then((data) => res.json(data));
};

exports.update = function (req, res, next) {
    const id = req.params.id;

    User.findByIdAndUpdate(id, {$set: req.body}, {new: false}).then(data => {
        res.json(data);
    });
};

exports.remove = function (req, res, next) {
    const id = req.params.id;
    User.findByIdAndDelete(id, (err, data) => {
        res.json(data);
    });
};

exports.removes = function (req, res, next) {
    const ids = req.body.ids.split(',');
    console.log(ids);
    if (ids.length > 0) {
        User.remove({_id: {$in: ids}}).then(data => {
            res.json({"message": "数据已删除!"})
        });
    }
};


exports.list = function (req, res, next) {
    let page = req.body.page ? req.body.page : 1;
    let rows = req.body.rows ? req.body.rows : 10;

    let queryCondition = {};
    if (req.body.name && req.body.name.trim().length > 0) {
        queryCondition = {
            "name": new RegExp(req.body.name, 'i')
        }
    }

    User.paginate(queryCondition, {page: +page, limit: +rows}, function (err, result) {
        result.rows = result.docs;
        delete result.docs;
        res.json(result);
    });
};

exports.get = function (req, res, next) {
    const id = req.params.id;
    User.findById(id).then(data => {
        res.json(data);
    });
};

exports.login = function (req, res, next) {
    const user = {
        id: 1,
        name: 't',
        age: 19,
        email: 't@t.t'
    };

    User.find(req.body, (err, results) => {
        let user = JSON.parse(JSON.stringify(results));
        delete results.password;
        jwt.sign({results}, 'MYSECRET', (err, token) => {
            user.token = token;
            res.json(user);
        });
    });
};