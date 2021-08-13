import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import {connect,useSelector} from 'react-redux'
import {login} from '../store/actions/authAction'


const Login = (props) => {
    const state = useSelector(state => state.auth.error)
    const [info,setInfo] = useState({
        email:'',
        password:'',
        error:{}
    })
    let {email,password,error}=info

    const handleChange = e =>{
        const newInfo = {...info}
        newInfo[e.target.name]=e.target.value
        setInfo(newInfo)
    }


    const handleSubmit = event =>{
        event.preventDefault()
        props.login({email,password},props.history)
    }



    return (
        
        <div className="row">
           <div className="col-md-6 offset-3">
               <h1 className='text-center display-4'>Login Here</h1>
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                        <label htmlFor='email'> Email:</label>
                        <input 
                            type="email"
                            placeholder='Enter your Email.'
                            className={state.email?state.email ?state.email ?'form-control is-invalid': state.email === state.message ?'form-control is-invalid':'form-control':'form-control':'form-control'}
                            id='email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                        />
                        {state.email?state.email ?<div id="validationServer04Feedback" className="invalid-feedback">
                        {state.email && state.email}
                        </div>:
                        <div id="validationServer04Feedback" className="invalid-feedback">
                        {state.message && state.message}
                        </div>:''}
                    </div>
                    <div className="form-group">
                        <label htmlFor='password'> Password:</label>
                        <input 
                            type="password"
                            placeholder="Enter your Password."
                            className={state.message ?state.password ?'form-control is-invalid':state.message ?'form-control is-invalid':'form-control':'form-control'}
                            id='password'
                            name='password'
                            value={password}
                            onChange={handleChange}
                        />
                       { state.password ?<div id="validationServer04Feedback" className="invalid-feedback">
                        {state.password && state.password}
                        </div>:
                        <div id="validationServer04Feedback" className="invalid-feedback">
                        {state.message && state.message}
                        </div>}
                    </div>
                    
                    <Link className='d-block mt-3' to='/register'>Don`t have account | Register here</Link>
                    <div className="text-center">
                        <button className="btn btn-primary m-auto mt-3">Login Here</button>
                    </div>
                </form>
            </div>
            {/* <div className="col-md-6"></div> */}
        </div>
    );
};

export default connect(null,{login})(Login);