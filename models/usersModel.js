import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 30,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
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
        type: Number,
        select: false,
    },
    forgotPasswordCode: {
        type: String,
        default: null,
        select: false,
    },
    forgotPasswordCodevalidation: {
        type: Number,
        select: false,
    },

},{
    timestamps:true
})

export default mongoose.model("User", userSchema);