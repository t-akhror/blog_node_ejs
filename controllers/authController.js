const User=require('../models/user')

// GET- login pageni ochish
const get_login=(req,res)=>{
    res.render('auth/login')
}
//POST-login qilish
const post_login=async(req,res)=>{
    const {email,password}=req.body
    console.log(req.body)
    try {
        const user = await User.findOne({email});
         if(!user){
            return res.send('Email topilmadi');
         }
         const isMatch=user.comparePassword(password)
         if(!isMatch){
            return res.send('Parol noto‘g‘ri');
         }
            req.session.userId=user._id
            req.session.username=user.username
            res.redirect('/')
      } catch (err) {
        console.error(err);
        res.send('Serverda xatolik');
      }
}

// GET-signup pageni ochish
const get_signup=(req,res)=>{
    res.render('auth/signup')
}

// POST-signup qilish
const post_signup=async(req,res)=>{
    const {username,email,password}=req.body
    try {
        const user=new User({username,email,password})
        await user.save();
        req.session.userId=user._id  //Sessiya saqlash
        req.session.username=user.username //Sessiya saqlash
        res.redirect('/')
    } catch (err) {
        res.status(400).send("Signup xatolik: " + err.message);
    }
}


module.exports={
    get_login,post_login,get_signup,post_signup
}
