const Transaction = require('../model/Transaction');
const {serverError} =require('../util/error')
const User =require('../model/User');

module.exports = {
    create(req,res){
        let{amount,type,note}=req.body
        let userId= req.user._id

        let transaction = new Transaction({
            amount,note,type,author:userId
        })

        transaction.save()
            .then(trans =>{
                let updateUser = {...req.user._doc}
                console.log('This is remon',updateUser);
                if (type === 'income') {
                    updateUser.balance = updateUser.balance + amount
                    updateUser.income = updateUser.income + amount
                } else if(type === 'expense') {
                    updateUser.balance = updateUser.balance - amount
                    updateUser.expense = updateUser.expense + amount
                }

                updateUser.transactions.unshift(trans._id)
                User.findByIdAndUpdate(updateUser._id,{ $set : updateUser},{new:true})
                    .then(result =>{
                        res.status(201).json({
                            message : 'Transaction created successfully..!',
                            ...trans._doc,
                            user:result
                        })
                    })
                    .catch(error =>serverError(res,error))
            })
            .catch(error =>serverError(res,error))

    },
    getAll(req,res){
        let{_id} = req.user
        Transaction.find({author :_id})
        .then(transactions =>{
            if (transactions.length === 0) {
                res.status(200).json({
                   message : 'Transaction not found'
                })
            }else{
               res.status(200).json(transactions)
            }
        })
        .catch(error => serverError(res,error))
    },
    getSingleTransaction(req,res){
        let{transactionId}=req.params
        Transaction.findById(transactionId)
        .then(transactions =>{
            if (!transactions) {
                res.status(200).json({
                   message : 'Transaction not found'
                })
            }else{
               res.status(200).json(transactions)
            }
        })
        .catch(error => serverError(res,error))
    },
    update(req,res){
        console.log('THis is body',req.body);
        let{transactionId}=req.params
        Transaction.findOneAndUpdate({_id: transactionId},{ $set :req.body},{new :true})
        .then(result =>{
            res.status(200).json({
                message : 'User update successfully...',
                transaction : result
            })
        })
        .catch(error => serverError(res,error))
    },
    remove(req,res){
        let{transactionId}=req.params
        Transaction.findOneAndDelete({_id: transactionId})
        .then(result =>{
            console.log('thisissss',{...result});
            res.status(200).json({
                message : 'Deleted successfully...',
                ...result._doc
            })
        })
        .catch(error => serverError(res,error))
    }
}