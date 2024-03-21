import  mongoose  from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema,ContactSchema } from "../models/crmModel.js";

const Contact = mongoose.model("Contact", ContactSchema);
const User = mongoose.model("User",UserSchema);




export const addNewContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact); // 201 Created
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getContactWithID = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.contactId);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate(
            { _id: req.params.contactId },
            req.body,
            { new: true }
        );
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteContact = async (req, res) => {
    try {
        const result = await Contact.deleteOne({ _id: req.params.contactId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Successfully deleted contact' });
    } catch (error) {
        res.status(500).send(error);
    }
};


export const loginRequired = (req,res,next) =>
{
    if(req.user)
        next();
    else
    return res.status(401).json({message:'Unauthoriwes user!'})
}

export const register = (req,res) =>
{
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password,10);
    newUser.save((err,user)=>{
        if(err)
        {
            return res.status(400).send({message:err});
        }
        else
        {
            user.hashPassword = undefined;
            return res.json(user)
        }
    })
}

export const login = (req,res) =>
{
    User.findOne({email:req.body.email})
    .then(user => {
        if(!user){
            return res.status(401).json({message:"Authentication failed0 No user found"});
        }

        if(!user.comparePassword(rea.body.password, user.hashPassword))
        {
            return res.status
        }
    })
            
            
}