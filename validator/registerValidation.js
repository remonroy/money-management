const validator = require('validator');

const validate = user =>{
    let error = {};

    if (!user.name) {
        error.name = 'Please provide your name';
    }
    if (!user.email) {
        error.email = 'Please provide your email';
    } else if(!validator.isEmail(user.email)){
        error.email = 'Please provide your valid email';
    }
    if (!user.password) {
        error.password = 'Please provide your password';
    } else if(user.password.length < 6){
        error.password = 'Check your password length';
    }
    if (!user.confirmPassword) {
        error.confirmPassword = 'Please provide your confirmPassword';
    } else if(user.password !== user.confirmPassword){
        error.password = 'Password Don\`t match'
    }
    return {
        error,
        isValid : Object.keys(error).length === 0
    }
}
module.exports = validate;