const express=require('express')
const {
    get_login,post_login,get_signup,post_signup
}=require('../controllers/authController')

const router=express.Router()

router.get('/login',get_login)
router.post('/login',post_login)
router.get('/signup',get_signup)
router.post('/',post_signup)

module.exports=router