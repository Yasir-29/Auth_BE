import joi from 'joi';

const signupschema = joi.object({
    email: joi.string().email({ 
        tlds: { allow: ['com', 'net', 'org', 'info', 'biz'] }
    }).min(3).max(30).required(),
    
    password: joi.string().min(8).max(30).required()
});

const signinschema = joi.object({
    email: joi.string().email().min(3).max(30).required(),
    password: joi.string().min(8).max(30).required()
});

export { signupschema, signinschema }; 