const joi = require('joi');
const jwt = require('jsonwebtoken');


const userSignUpValidation = (req, res, next) => {
    const schema = joi.object({
        fullName: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).alphanum().required()
    })
    const {error, value} = schema.validate(res.body);
    if(error) {
        return res.status(400).json({ message: 'Bad Request', error})
    }
    next();
}

const userSignInValidation = (req,res,next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).alphanum().required()
    })
    const {error, value} = schema.validate(res.body);
    if(error){
        return res.status(400).json({message: 'Bad Request', error})
    }
    next();
}


const verifyToken = (req,res,next) => {
    if(!req.headers['authorization']){
        return res.status(403).json({ message: 'Token is required'});
    }
    try {
        const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET)
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}


module.exports = {userSignUpValidation, userSignInValidation, verifyToken}