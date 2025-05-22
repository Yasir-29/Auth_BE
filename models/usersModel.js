import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 15,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        trim: false,
        select: false,
    },
    verified: {
        type: Boolean,
        default: false,

    },
    verificationCode: {
        type: String,
        default: null,
        select: false,
    },
    verificationCodevalidation: {
        type: number,
        select: false,
    },
    forgotPasswordCode: {
        type: String,
        default: null,
        select: false,
    },
    forgotPasswordCodevalidation: {
        type: number,
        select: false,
    },

},{
    timestamps:true
})

module.exports=mongoose.Model('User', userSchema);