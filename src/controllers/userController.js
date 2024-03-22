import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/userModel.js";

const User = mongoose.model('User',UserSchema)


export const loginRequired = (req,res,next) =>
{
    if(req.user)
        next();
    else
    return res.status(401).json({message:'Unauthoriwes user!'})
}



export const register = async (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
        await newUser.save();
        newUser.hashPassword = undefined;
        return res.json(newUser);
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
};




            
export const login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: "Authentication failed. No user found" });
            }

            if (!user.comparePassword(req.body.password)) {
                return res.status(401).json({ message: "Authentication failed. Passwords do not match" });
            }

            // Passwords match, you can proceed with authentication logic here
            const token = jwt.sign({ email: user.email, _id: user._id },'RESTFULAPIs');
            return res.json({ token });
        })
        .catch(err => {
            console.error("Error during login:", err);
            res.status(500).json({ message: "Internal server error" });
        });
};
