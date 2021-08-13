import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {connect,useSelector} from 'react-redux';
import {register,} from '../store/actions/authAction'

const Register = (props) => {
    // console.log('This is props',props);
    const state = useSelector(state => state.auth.error)
    const [info,setInfo] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        error:{}
    })
    
    let {name,email,password,confirmPassword,error}=info

    const handleChange = e =>{
        const newInfo = {...info}
        newInfo[e.target.name]=e.target.value
        setInfo(newInfo)
    }

    const handleSubmit = event =>{
        event.preventDefault()
        props.register({name,email,password,confirmPassword},props.history);
    }



    return (
        
        <div className="row">
           <div className="col-md-6">
               <h1 className='text-center display-4'>Register Here</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor='name'> Name:</label>
                        <input 
                            type="text"
                            placeholder="Enter your Name."
                            className={state.name ?'form-control is-invalid':'form-control'}
                            id='name'
                            name='name'
                            value={name}
                            onChange={handleChange}
                        />
                        <div id="validationServer04Feedback" className="invalid-feedback">
                        {state.name && state.name}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor='email'> Email:</label>
                        <input 
                            type="email"
                            placeholder="Enter your Email."
                            className={state.email ?'form-control is-invalid':state.message ? 'form-control is-invalid':'form-control'}
                            id='email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                        />
                        <div id="validationServer04Feedback" className="invalid-feedback">
                        {state.email && state.email}
                        </div>
                        <div id="validationServer04Feedback" className="invalid-feedback">
                        {state.message && state.message}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor='password'> Password:</label>
                        <input 
                            type="password"
                            placeholder="Enter your Password."
                            className={state.password ?'form-control is-invalid':'form-control'}
                            id='password'
                            name='password'
                            value={password}
                            onChange={handleChange}
                        />
                        <div id="validationServer04Feedback" className="invalid-feedback">
                        {state.password && state.password}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor='confirmPassword'> ConfirmPassword:</label>
                        <input 
                            type="password"
                            placeholder="Enter your ConfirmPassword."
                            className={state.confirmPassword ? 'form-control is-invalid':'form-control'}
                            id='confirmPassword'
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleChange}
                        />
                        <div id="validationServer04Feedback" className="invalid-feedback">
                        {state.confirmPassword && state.confirmPassword}
                        </div>
                    </div>
                    <Link className='d-block mt-3' to='/login'>Already have account | Login here</Link>
                    <div className="text-center">
                        <button className="btn btn-primary m-auto mt-3">Register Here</button>
                    </div>
                </form>
            </div>
            <div className="col-md-6 ">
                <img 
                style={{width:"100%",height:'100%'}}
                src="https://files.fm/thumb_show.php?i=twjnfxjzj"
                alt=""
                />
            </div>
        </div>
    );
};

export default connect(null,{register})(Register);