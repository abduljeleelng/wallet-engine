const  express = require('express')
const router = express.Router();
const Auth = require('../controller/auth')
const Ctr = require('../controller')
const MidAuth = require('../middlewares')
const MidVal = require('../middlewares/validator')

router.post("/user/auth/signup", MidVal.signUp, Auth.create);
router.put("/user/auth/activate", MidVal.activate, Auth.activate);
router.post("/user/auth/signin", MidVal.signIn, Auth.signIn);
router.put("/user/auth/forgetPassword", Auth.forgetPassword);
router.put("/user/auth/resetpassword", Auth.resetpassword);

router.get("/user/balance",MidAuth.requiredSignin, MidAuth.balance, Ctr.balance);
router.post("/user/debit", MidAuth.requiredSignin, MidAuth.balance, Ctr.debit);
router.post("/user/credit",MidAuth.requiredSignin, MidAuth.balance, Ctr.credit);

router.put("/user/deactivate",MidAuth.requiredSignin, Ctr.deactivateWallet);




module.exports = router;