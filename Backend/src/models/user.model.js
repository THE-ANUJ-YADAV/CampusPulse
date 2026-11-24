import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
         
    name : { type: String , required : true , trim : true},
    contact : { type : String },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password : {
        type: String,
        required : true
    },
    role : {
       type : String,
       enum : [ "student" , "staff" , "departmentHead" ],
       default : "student"
    },
    departmentId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Department"
    }

    },{
        timestamps : true
    }
)

const User = mongoose.model("User",userSchema)

export default User