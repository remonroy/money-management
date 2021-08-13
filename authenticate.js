const passport =require('passport')

module.exports =(req,res,next)=>{
    passport.authenticate('jwt',(err,user,info)=>{
        if (err) {
            console.log(err);
            console.log(info);
            return next(err)
        }
        if (!user) {
            console.log('This is user info: ',user);
            return res.status(400).json({
                message : 'Authenticated Fail..'
            })
        }
       
        req.user = user
        return next()
    })(req, res, next)
}
