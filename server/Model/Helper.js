const mongoose = require("mongoose") ;

const HelperSchema = new mongoose.Schema({
 
    username:{type:String,required:true,unique:true},
    specialization:{type:String,required:true},
    phone_no:{type:Number,required:true},
    address:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
  });

  module.exports = mongoose.model("helpers", HelperSchema);
