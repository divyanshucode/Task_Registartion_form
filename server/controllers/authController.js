const User = require('../models/user')
const {hashPassword,comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')



const test = (req,res) => {
    res.json('Test is working')
}

//why async: requesting data from database is an asynchronous task
const registerUser = async (req,res) => {
      try {
        const {name , email , password} = req.body
        if(!name){
            return res.json({error: 'Name is required'})
        }
        if(!password || password.length < 6){
            return res.json({error: 'Password is required and should be 6 characters long'})
        }
        //check if email already exist or not
        const exist = await User.findOne({email})
        if(exist){
            return res.json({error: 'Email already exist'})
        }

        const hashedPassword = await hashPassword(password)

        //create an user
        const user = await User.create({name,email,password: hashedPassword})
        return res.json({message: 'User created successfully', user})
      } catch(error){
        console.log(error)
        return res.json({error: 'Something went wrong'})

     }
}



//login endpoint
const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body
        //check if user with the email exist or not
        const user = await User.findOne({email})
        if(!user){
            return res.json({error: 'Invalid Email'})
        }

        //check password match
        
        const match = await comparePassword(password,user.password)
        if(match){
            jwt.sign({email:user.email, id:user._id, name:user.name},process.env.JWT_SECRET,{},(err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json(user)
            })
            
        }
        if(!match){
            return res.json({error: 'Password does not match'})
        }
    }catch(error){
        console.log(error)
        
    }
}
const getProfile = (req,res)=>{
   const {token} = req.cookies
   if(token){
    jwt.verify(token, process.env.JWT_SECRET,{} ,(err,user)=>{
        if(err) throw err;
        res.json(user)
    })
   }else {
    res.json(null)
   }
}

module.exports = {
   test ,
   registerUser,
   loginUser,
   getProfile
}
