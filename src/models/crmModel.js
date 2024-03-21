import mongoose from 'mongoose';
import bcrypt, { hash } from 'bcrypt';

const Schema = mongoose.Schema;


export const ContactSchema = new Schema({
    firstName:{
        type:String,
        required: 'Enter a first name'
    },
    lastName:{
        type:String,
        required: 'Enter a last name'
    },
    email: {
        type:String
    },
    company: {
        type:String
    },
    phone: {
        type:Number
    },
    created_date: {
        type:Date,
        default:Date.now
    }
})

export const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    hashPassword:{
        type:String,
        required:true
    },
    created_date:{
        type:Date,
        default: Date.now
    }
}
);

UserSchema.methods.comparePassword = (password,hashPassword) =>
{
    return bcrypt.compareSync(password,hashPassword);
}