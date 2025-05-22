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
        }
        catch(error)
        {
            console.log(error);
        }
    }
};

export default authController;