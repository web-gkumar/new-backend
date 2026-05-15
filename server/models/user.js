const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name:{ type:String, trim:true},
    email:{ type:String, trim:true, unique:true, lowercase:true},
    mobile:{ type:String, trim:true, unique:true},
    password:{ type:String},
    address:{ type:String, trim:true},
    country:{ type:String, trim:true},
    village:{ type:String, trim:true},
    district:{ type:String, trim:true},
    state:{ type:String, trim:true},
    pincode:{ type:String, trim:true },
    picture:{ type:String, default:""},
    resetPasswordToken:{ type:String},
    resetPasswordExpires:{ type:Date}
},
{ timestamps:true}
);

module.exports = mongoose.model("User", userSchema);