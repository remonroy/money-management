import React,{useEffect, useState} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import CreateTransaction from '../Component/Transaction/CreateTransaction';
import UpdatedTransaction from '../Component/Transaction/UpdatedTransaction';
import {loadTransaction,removeTransaction,updatedTransaction} from '../store/actions/transactionAction'

const Dashboard = () => {
    const state =useSelector(state=>state.auth)
    const transactionState =useSelector(state=>state.transactions)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(loadTransaction())
    },[transactionState])

    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal =()=>{
      setIsOpen(true);
    }
    const closeModal=()=> {
      setIsOpen(false);
    }
    const [UpdateOpen, setUpdateOpen] = useState({init:false,id:0});

    const UpdateOpenModal =(id)=>{
        setUpdateOpen({init:true,id})
        
    }
    const UpdateCloseModal=(id)=> {
        setUpdateOpen({init:false,id})
    }
  
    return (
        <>
            <div className="d-flex justify-content-evenly mt-5 mb-3">
                <img 
                style={{boxShadow:'0px 1px 18px 17px #ddd',border:'2px solid',width:'60px',height:'60px',borderRadius:'50%'}}
                src={state.user.email === "remonroy34@gmail.com" ?"https://files.fm/thumb_show.php?i=xwza25vdu":'https://files.fm/thumb_show.php?i=k3t6ppmdk'}
                alt=""/> 
                <h6 className="mt-3">Name : {state.user.name}</h6>
                <h5 className="mt-3">Email : {state.user.email}</h5>
                <div>
                   <button onClick={openModal} className="btn btn-primary mt-3">Create transaction</button>
                   <CreateTransaction modalIsOpen={modalIsOpen} closeModal={closeModal} />
                </div>
            </div>

            <ul class="list-group">
                { transactionState?.length ?
                    
                    transactionState?.map(item=>(
                        <li 
                        key={item._id}
                        class="list-group-item"
                        >
                            <p>Amount : {item.amount}</p>
                            <p>Type : {item.type}</p>
                            { UpdateOpen.id === item._id?
                                <UpdatedTransaction 
                                modalIsOpen={UpdateOpen} 
                                closeModal={UpdateCloseModal} 
                                transaction ={item}
                                />:null

                            }
                            <button 
                                className="btn btn-danger"
                                onClick={()=>dispatch(removeTransaction(item._id),)}
                            >
                                Remove
                            </button>
                            <button 
                                className="btn btn-success ms-2"
                                onClick={()=>UpdateOpenModal(item._id)}
                            >
                                Update
                            </button>
                           
                        </li>
                    )) :<h2 
                            style={{display:'grid',placeItems:'center',width:'100%',height:'70vh'}}
                        >{transactionState.message}</h2>
                }
            </ul>
        </>
    );
};

export default connect(null,{loadTransaction,removeTransaction,updatedTransaction})(Dashboard);