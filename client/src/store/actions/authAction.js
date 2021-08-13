import Axios from 'axios'
import * as Types from './types'
import jwtDecode from 'jwt-decode'
import authToken from '../../util/authToken'

export const register =(user,history) => dispatch => {
    Axios.post('/api/users/register',user)
    .then(res =>{
        dispatch({
            type:Types.USERS_ERROR,
            payload:{
                error:{}
            }
        })
        console.log('This is res',res);
        history.push('/login')
    })
    .catch(error => {
        dispatch({
            type:Types.USERS_ERROR,
            payload:{
                error: error.response.data
            }
        })
    })
}
export const login =(user,history) => dispatch => {
    Axios.post('/api/users/login',user)
    .then(res =>{
        let token =res.data.token
        localStorage.setItem('Auth_token',token)
        authToken(token)
        let decoded=jwtDecode(token)
        dispatch({
            type:Types.SET_USERS,
            payload:{
                user:decoded
            }
        })
        history.push('/dashboard')
    })
    .catch(error =>{
        dispatch({
            type:Types.USERS_ERROR,
            payload:{
                error:error.response.data
            }
        })
    })
}
export const logout =(history)=>{
    localStorage.removeItem('Auth_token')
    history.push('/login')
    return{
        type:Types.SET_USERS,
        payload:{
            user:{}
        }
    }
}