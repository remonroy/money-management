import React,{useState} from 'react';
import Modal from 'react-modal';
import { connect,useDispatch } from 'react-redux';
import {updatedTransaction} from '../../store/actions/transactionAction';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px'
  },
};

Modal.setAppElement('#root');
const UpdatedTransaction = ({modalIsOpen,closeModal,transaction}) => {
    const dispatch = useDispatch()
    const [modal,setModal] = useState({
        amount:transaction.amount,
        note:transaction.note,
    })

    const handleChange = e =>{
        const newInfo = {...modal}
        newInfo[e.target.name] = e.target.value 
        setModal(newInfo)
    }
    const data={
        amount:parseInt(modal.amount),
        note:modal.note,
    }
    const handleFormSubmit = event =>{
        event.preventDefault()
        dispatch(updatedTransaction(transaction._id,data))
        closeModal()
    }

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 className="text-center">Create transaction</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor='amount'> Amount:</label>
                        <input 
                            type="number"
                            placeholder="Enter your amount."
                            className='form-control'
                            id='amount'
                            name='amount'
                            value={modal.amount}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor='note'> Note:</label>
                        <textarea 
                            placeholder="Enter your note."
                            className='form-control'
                            id='note'
                            name='note'
                            value={modal.note}
                            onChange={handleChange}
                        />
                    </div>
                   <div  className="text-center">
                        <button className="btn btn-primary mt-2">submit</button>
                   </div>
                </form>
            </Modal>
        </>
    );
};

export default connect(null,{updatedTransaction})(UpdatedTransaction);