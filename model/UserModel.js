import mongoose from "mongoose";
import { Schema } from "mongoose";

//CREATE SCHEMA
const UserSchema = new Schema({
    firstName:{
        type:String,
        unique:false,
        required:true,
        min:3,
        max:255,        
    },    
    email:{
        type:String,
        unique:false,
        required:true,
    },
    password:{
        type:String,
        unique:false,
        require:true
    },
    date:{
        type:String,
        default:Date.now()
    }
});

const User = mongoose.model("User", UserSchema);
export default User;
