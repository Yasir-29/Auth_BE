import {signupschema} from "../middlewares/Validator.js";
import {signinschema} from "../middlewares/Validator.js";
import {doHash} from "../hashing.js";
import {doHashValidation} from "../hashing.js";
import jwt from "jsonwebtoken";
import userModel from "../models/usersModel.js";
import cookieParser from "cookie-parser";
const authController = {
    signup: async (req, res) => {
        const { email, password } = req.body;
        try {
            const { error, value } = signupschema.validate({ email, password });
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            const hashedPassword = await doHash(password, 10);
            const newUser = new userModel({ email, password: hashedPassword });
            const result = await newUser.save();
            result.password = undefined;

            res.status(201).json({
                message: 'User created successfully',
                user: result
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    signin: async (req, res) => {
        const { email, password } = req.body;
        try {
            const { error, value } = signinschema.validate({ email, password });
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const existingUser = await userModel.findOne({ email }).select('+password');
            if (!existingUser) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            const result = await doHashValidation(password, existingUser.password);
            if (!result) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            const token = jwt.sign(
                { userid: existingUser._id, email: existingUser.email, verified: existingUser.verified },
                process.env.TOKEN_SECRET
            );

            res.cookie('Authorization', 'Bearer ' + token, {
                expires: new Date(Date.now() + 900000),
                httpOnly: true
            });

            res.status(200).json({
                success: true,
                token,
                message: 'User signed in successfully'
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

export default authController;