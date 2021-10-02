const models = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.activateAndCreateWallet = async token =>{
    let user = await models.User.findOne({
        where:{token}
    })
    if(!user){
        return {error:"Invalid token"}
    }
    await models.Wallet.create({user_id:user.id})
    // const data =  await User.update({token:"", activate:true}, {where:{id:user.id}})
    await models.User.update({activate:true}, {where:{id:user.id}})
    return user
}

exports.balance =async user_id =>{
    try {
        const balance = await models.Wallet.findOne({where:{user_id}})
        if(!balance) return {error:"Error in getting balace"}
        return balance
    } catch (error) {
        return {error:"Error in getting balace"}
    }
}

exports.debit = async (user_id, amount, wallet)=>{
    try {
        let balance = wallet.balance-amount
        let debit = await models.Wallet.update({balance},{where:{user_id}})
        if(!debit) return {error:"Error in debit user"}
        let txn_id = uuidv4()
        const paylod = {user_id, amount, type:"Debit",wallet_id:wallet.id,confirmed:true,network_fee:0,txn_id,meta:"Demo debit" }
        let transaction = await models.Transaction.create(paylod)
        if(!transaction) return {error:"Error in transaction"}
        return {transaction,balance}
    } catch (error) {
        //rollback transaction 
        return {error:"Error in debit user"}
    }
}

exports.credit = async (user_id, amount, wallet) =>{
    try {
        let balance = wallet.balance+amount
        let credit = await models.Wallet.update({balance},{where:{user_id}})
        if(!credit) return {error:"Error in credit user"}
        let txn_id = uuidv4()
        const paylod = {user_id, amount, type:"Credit",wallet_id:wallet.id,confirmed:true,network_fee:0,txn_id,meta:"Demo Credit" }
        let transaction = await models.Transaction.create(paylod)
        if(!transaction) return {error:"Error in transaction"}
        return {transaction,balance}
    } catch (error) {
        //rollback transaction 
        return {error:"Error in credit user"}
    }
}

exports.deactivateWallet = async data=>{

    return 0 

}