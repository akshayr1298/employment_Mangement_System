
const asynHandler = require('express-async-handler')
const generateToken = require('../config/generateToken')
const User = require('../models/userModels')

const signUp = asynHandler(async(req,res)=>{

    const {name,email,password,pic} = req.body
    if(!name||!email||!password){
        res.status(400)
        throw new Error("Please enter all the feilds")
    }
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error("user already exists")
    }
    const user = await User.create({
        name,
        email,
        password,
        pic
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)


        })
    }else{
        res.status(400)
        throw new Error("Failed to create the user")
    }

})

const doLogin = asynHandler(async(req,res)=>{
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
              _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)

        })
    }else{
        res.status(401)
        throw new Error("invalid Email or password")
    }

})


module.exports = {signUp,doLogin}