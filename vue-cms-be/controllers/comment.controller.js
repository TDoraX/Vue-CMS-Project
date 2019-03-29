// const mongoose = require('mongoose');
const Comment = require('../models/comment.model');

exports.create = function (req, res, next) {
    const comment = new Comment(req.body);
    comment.save().then((data) => res.json(data));
};

exports.update = function (req, res, next) {
    const id = req.params.id;

    Comment.findByIdAndUpdate(id, {$set: req.body}, {new: false}).then(data => {
        res.json(data);
    });
};

exports.remove = function (req, res, next) {
    const id = req.params.id;
    Comment.findByIdAndDelete(id, (err, data) => {
        res.json(data);
    });
};

exports.list = function (req, res, next) {
    let page = req.body.page ? req.body.page : 1;
    const rows = req.body.rows ? req.body.rows : 10;

    let queryCondition = {};
    if (req.body.name && req.body.name.trim().length > 0) {
        queryCondition = {
            "title": new RegExp(req.body.name, 'i')
        }
    }

    if (req.body.newsId && req.body.newsId.trim().length > 0) {
        queryCondition = Object.assign(queryCondition, {
            "newsId": req.body.newsId
        })
    }

    Comment.paginate(queryCondition, {page: +page, limit: +rows}, function (err, result) {
        result.rows = result.docs;
        delete result.docs;
        res.json(result);
    });
};

exports.get = function (req, res, next) {
    const id = req.params.id;
    Comment.findById(id).then(data => {
        res.json(data);
    });
};