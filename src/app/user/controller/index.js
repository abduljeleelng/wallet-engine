// const jwt = require("jsonwebtoken")
// const { Op } = require("sequelize")
// const {mainEmail} = require('../middlewares/helper')
require('dotenv').config();
const models = require('../../../models')
const users = require('../../../services')


exports.balance =async (req, res) =>{
    // #swagger.tags = ['eWallet services']
    // #swagger.summary = 'balance'
    // #swagger.description = 'Endpoint to get balance in the users account.'
    /* #swagger.security = [{
            "bearerAuth": []
        }] 
    */
    try {
        return res.status(200).json({balance:req.wallet.balance})
    } catch (error) {
        return res.status(406).json({error:"Can not get the user balance"})
    }
}

exports.debit = async (req, res) =>{
    // #swagger.tags = ['eWallet services']
    // #swagger.summary = 'debit'
    // #swagger.description = 'Endpoint to make withdrawer services'
    /* #swagger.security = [{
            "bearerAuth": []
        }] 
    */

    //communicate with external servies such NIBSS, Paystack, flutterwave and charge the user then return the amount
    const {amount} = req.body
    try {
        if(req.balance < amount) return res.status(406).json({error:"Insuficient fund in the user wallet"})
        const data = await users.debit(req.auth.id, amount, req.wallet)
        if(data.error) return res.status(406).json(data.error)
        return res.status(200).json({data})
    } catch (error) {
        return res.status(503).json({error:"Error in transaction"}) 
    }
}

exports.credit = async (req, res) =>{
    // #swagger.tags = ['eWallet services']
    // #swagger.summary = 'credit'
    // #swagger.description = 'Endpoint to fund the wallet and get payment '
    /* #swagger.security = [{
            "bearerAuth": []
        }] 
    */

    //communicate with external servies such NIBSS, Paystack, flutterwave and charge the user then return the amount
    const {amount} = req.body
    try {
        if(req.balance < amount) return res.status(406).json({error:"Insuficient fund in the user wallet"})
        const data = await users.credit(req.auth.id, amount, req.wallet)
        if(data.error) return res.status(406).json(data.error)
        return res.status(200).json({data})
    } catch (error) {
        return res.status(503).json({error:"Error in transaction"}) 
    }

}

exports.deactivateWallet = async (req, res) =>{
    // #swagger.tags = ['eWallet services']
    // #swagger.summary = 'Account'
    // #swagger.description = 'Endpoint to deactivate user and the wallets.'
    /* #swagger.security = [{
            "bearerAuth": []
        }] 
    */
    try {
        const data = models.User.update({blocked:true}, {where:{id:req.auth.id}})
        if(!data) return res.status(406).json({error:"Error in deactivating account"})
        return res.status(200).json({message:"Account is successfully activated"}) 
    } catch (error) {
        return res.status(503).json({error:"Error in deactivating account"}) 
    }
}
