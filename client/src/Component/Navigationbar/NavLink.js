import React,{Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom'
import {useSelector,connect,useDispatch} from 'react-redux'
import {logout} from '../../store/actions/authAction'

const NavLink = (props) => {
    const stateAuth = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    return (
        <div>
           <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand text-white" href="#">Navbar</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto ">
                        <Link className ='nav-link text-white' to='/' exact>Home</Link>
                            {
                                stateAuth ?
                                <Fragment>
                                    <Link className ='nav-link  text-white' to='/dashboard'>Dashboard</Link>
                                    <Link className ='nav-link '>
                                    <button
                                    className='btn btn-danger'
                                    onClick={()=>dispatch(logout(props.history))}
                                    >Logout</button>
                                    </Link>
                                </Fragment>:
                                <Fragment>
                                    <Link className ='nav-link text-white' to='/register'>Register</Link>
                                    <Link className ='nav-link text-white' to='/login'>Login</Link>
                                </Fragment>
                            } 
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default connect(null,{logout})(withRouter(NavLink));