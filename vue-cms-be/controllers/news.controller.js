// const mongoose = require('mongoose');
const News = require('../models/news.model');
const Comment = require('../models/comment.model');
// const async = require('async');
exports.create = function (req, res, next) {
    const news = new News(req.body);
    news.save().then((data) => res.json(data));
};

exports.update = function (req, res, next) {
    const id = req.params.id;

    News.findByIdAndUpdate(id, {$set: req.body}, {new: false}).then(data => {
        res.json(data);
    });
};

exports.remove = function (req, res, next) {
    const id = req.params.id;
    News.findByIdAndDelete(id, (err, data) => {
        res.json(data);
    });
};

exports.list = function (req, res, next) {
    let page = req.body.page ? req.body.page : 1;
    let rows = req.body.rows ? req.body.rows : 10;

    let queryCondition = {};
    if (req.body.name && req.body.name.trim().length > 0) {
        queryCondition = {
            "title": new RegExp(req.body.name, 'i')
        };
    }

    if (req.body.newsId && req.body.newsId.trim().length > 0) {
        queryCondition = Object.assign(queryCondition, {
            "newsId": req.body.newsId
        });
    }

    News.paginate(queryCondition, {page: +page, limit: +rows}, function (err, result) {
        result.rows = result.docs;

        async function getCount(result) {
            for (let i = 0; i < result.rows.length; i++) {
                await Comment.count({newsId: result.rows[i]._id}, function (err, count) {
                    result.rows[i].commentCount = count;
                });
            }
            return result;
        }

        getCount(result).then(data => {
            res.json(data);
        });


        // for(let i=0;i<result.rows.length;i++){  // 这一行代码执行速度快不快？
        //   // 打印出10条新闻的ID
        //   Comment.count({newsId :result.rows[i]._id },function(err,count){ // 这一行代码执行速度快不快？
        //     console.log(result.rows[i]._id,count);
        //     result.rows[i].commentCount = count;  // 这一行代码执行速度快不快？
        //   })
        // }


        // async.map(result.rows, function(News,cb) {
        //   Comment.count({newsId: News._id},function(err,count){
        //     News.commentCount = count;
        //     cb(null,News)
        //   })
        // },function(err,results){
        //   delete result.docs;
        //   res.json(result);
        // });


    });
};

exports.get = function (req, res, next) {
    const id = req.params.id;
    News.findById(id).then(data => {
        res.json(data);
    })
}