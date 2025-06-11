const express =require('express')
const {post_create_get,post_delete,post_create_post,post_details,post_index}=require('../controllers/postController')
const isAuthenticated=require("../midlleware/isAuthenticated")

const router=express.Router()

router.get('/',post_index)
router.get('/create',isAuthenticated,post_create_get)
router.get('/:id',post_details)
router.post('/',isAuthenticated,post_create_post)
router.delete('/:id',post_delete)
// commentsd
module.exports=router;