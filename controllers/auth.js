import User from '../models/user';
import jwt from 'jsonwebtoken';
const expressJwt = require('express-jwt');
export const signup = (req, res) => {
    const user = new User(req.body);
    user.save((error) => {
        if (error) {
            return res.status(400).json({
                error: " không thể đăng kí tài khoản"
            })
        }
          user.salt = undefined
          user.hashed_password = undefined
        res.json({ user })
    })
}
export const signin = (req,res) => {
    //find the user base on email
    const { email, password } = req.body;
    User.findOne({email }, (error,user) => {
        if(error || !user){
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'Email and password not match'
            })
        }
        const token = jwt.sign({_id: user._id }, process.env.JWT_SECRET);
        res.cookie('t',token, { expire: new Date() +9999});
        const{ _id, name, email, role } = user;
        return res.json(
            {
                token, user: {_id , email, name, role}
            }
        )
    });
}
export const signout  = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: 'Signout Success'
    })
}
export const requireSignin = expressJwt({
    secret:'longdeptrai' ,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});

export const isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}

export const isAdmin = (req, res, next) => {
    if (req.profile.role == 0) {
        return res.status(403).json({
            error: "Admin resource! Access Denined"
        })
    }
    next();
}