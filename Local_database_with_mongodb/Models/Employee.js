const mongoose = require("mongoose");

const Emp = mongoose.Schema(
  {
    _id:Number,
    EmpName : String,
    EmpAge : Number,
  }
);

module.exports = new mongoose.model('Employee',Emp);