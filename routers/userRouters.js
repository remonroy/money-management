const router = require('express').Router()
const {login,register,allUser} = require('../controllers/userControllers')

//register route
//localhost : 4000/api/users/register
router.post('/register',register)

//login route
//localhost : 4000/api/users/login
router.post('/login',login)

//User show route
//localhost : 4000/api/users/all
router.get('/all',allUser)
module.exports = router;