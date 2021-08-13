const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registerValidation = require('../validator/registerValidation');
const loginValidation = require('../validator/loginValidator');
const User = require('../model/User');
const {serverError,resourceError} = require('../util/error')


//login controllers
module.exports = {
    login(req,res){
       let{email,password} = req.body;
       const validate = loginValidation({email,password})
        if (!validate.isValid) {
           return res.status(400).json(validate.error)
        }
        User.findOne({email})
        .then((user)=>{
            if (!user) {
                return resourceError(res, 'User not found..')
            }
            bcrypt.compare(password,user.password,(err,result)=>{
                if (err) {
                    return serverError(res,err)
                }
                if (!result) {
                    return resourceError(res, 'Password Dosen\`t Match..')
                }

                let token = jwt.sign({
                    _id : user._id,
                    name : user.name,
                    email : user.email,
                    balance : user.balance,
                    income : user.income,
                    expense : user.expense,
                    transactions : user.transactions
                    
                },'SECRET',{expiresIn :'2h'})
                res.status(200).json({
                    message : 'user login successfully...',
                    token :`Bearer ${token}`
                })
            })
        })
        .catch(error => serverError(res,error) )
    },

    register(req,res){
        let {name,email,password,confirmPassword} = req.body;
        const validate =registerValidation({name,email,password,confirmPassword})
        if (!validate.isValid) {
            res.status(400).json(validate.error)
        }else{
            User.findOne({email})
           .then((user)=>{
                if (user) {
                    return resourceError(res, 'Email already exits...')
                }
                bcrypt.hash(password,11,(err,hash)=>{
                    if (err) {
                       return resourceError(res,'Server error occurred..?')
                    }
                    let user = new User({
                        name,
                        email,
                        password : hash,
                        balance : 0,
                        income : 0,
                        expense :0,
                        transactions:[]
                    })
                    user.save()
                    .then((user)=>{
                       res.status(201).json({
                        message : 'User created successfully..!',
                        user,
                       })
                    })
                    .catch(error =>{
                       return serverError(res,error)
                    })
                })

            })
           .catch(error => serverError(res,error) )
        }
    },
    allUser(req,res){
        User.find()
            .then(result =>{
                res.status(201).json(result)
            })
            .catch(error =>(res,error))
    }
}