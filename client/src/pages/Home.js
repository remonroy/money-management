import React from 'react';
import {Link} from 'react-router-dom'
import{connect,useSelector} from 'react-redux'
import {logout} from '../store/actions/authAction'

const Home = (props) => {
    const state=useSelector(state=>state.auth)
    return (
        <div className="row">
             <div className="col-md-6 ">
                <img 
                style={{width:"100%",height:'100%'}}
                src="https://files.fm/thumb_show.php?i=v2d42qaw5"
                alt=""
                />
            </div>
            <div className="col-md-6">
                <a href="/dashboard" className='btn btn-primary mt-5'>Dashboard</a>
            </div>
        </div>
    );
};

export default connect(null,{logout})(Home);