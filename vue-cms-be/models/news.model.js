var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    newsId      : mongoose.Schema.ObjectId,            // cateId 分类的ID
    title       : String,
    content     : String,
    date        : { type: Date, default: Date.now },
    commentCount: { type: Number,default:0}
 });
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('News',  schema);  // Model.paginate()