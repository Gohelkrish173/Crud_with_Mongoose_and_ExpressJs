const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id : mongoose.ObjectId,
    Name    :   String,
    Image   :   String,
    FacId   :   Number,
    Dept    :   String,
    Salary  :   Number
});

module.exports = mongoose.model("Faculty",schema);