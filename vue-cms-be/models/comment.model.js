var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    newsId : mongoose.Schema.ObjectId,            // cateId 分类的ID
    title  : String,
    content: String,
    date   : { type: Date, default: Date.now },
 });
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Comment',  schema);  // Model.paginate()