import signupschema from "../middlewares/Validator.js";
import doHash from "../hashing.js";

import userModel from "../models/usersModel.js";
const authController = {
    signup: async (req, res) => {
        const{email,password}=req.body;
        try {
            const {error,value}=signupschema.validate({email,password});
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            const hashedPassword = await doHash(password, 10);
            const newUser = new userModel({
                email,
                password: hashedPassword
            });
            const result = await newUser.save();
            result.password = undefined;
            res.status(201).json({
                message: 'User created successfully',
                user: result
            });
        }
        catch(error)
        {
            console.log(error);
        }
    }
};

export default authController;