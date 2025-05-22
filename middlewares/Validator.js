import joi from 'joi';

const signupschema = joi.object({
    email: joi.string().min(3).max(30).required().email(),
    tlds:{allow: ['com', 'net', 'org', 'info', 'biz']},
    password: joi.string().min(8).max(30).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
});

export default signupschema;