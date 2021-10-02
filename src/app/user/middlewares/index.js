const expressJWT = require('express-jwt');
require("dotenv").config();
const users = require('../../../services')

exports.requiredSignin = expressJWT({
    algorithms:['sha1', 'RS256', 'HS256'],
    secret:process.env.JWT_SECRET,
    requestProperty: 'auth'
})

exports.balance = async (req, res, next) =>{
    try {
        const data = await users.balance(req.auth.id);
        if(data.error) return res.status(406).json({error:"Can not get the user balance"})
        req.wallet = data
        next()
    } catch (error) {
        return res.status(406).json({error:"Can not get the user balance"})
    }
}
