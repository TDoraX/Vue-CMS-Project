// const mongoose = require('mongoose');
const Cate = require('../models/cate.model');

exports.create = function (req, res, next) {
    const cate = new Cate(req.body);
    cate.save().then((data) => res.json(data));
};

exports.update = function (req, res, next) {
    const id = req.params.id;

    Cate.findByIdAndUpdate(id, {$set: req.body}, {new: false}).then(data => {
        res.json(data);
    });
};

exports.remove = function (req, res, next) {

};

function reverseTree(data, pid) {

    let result = [], temp;
    data = JSON.parse(JSON.stringify(data));
    for (let i in data) {
        if (data[i].parentId === pid) { // 如果查询到的对象内容的parentId和传递过来的pid是相同的
            result.push(data[i]);
            temp = reverseTree(data, data[i]._id);
            if (temp.length > 0) {
                data[i].children = temp;
            }
        }
    }
    return result;
}

exports.list = function (req, res, next) {
    let type = req.params.type;
    Cate.find({type: type}, function (err, data) {
        res.json(reverseTree(data, null));
    });
};

exports.get = function (req, res, next) {
    const id = req.params.id;
    Cate.findById(id).then(data => {
        res.json(data);
    });
};