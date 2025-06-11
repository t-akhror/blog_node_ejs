// Identifikatsiyadn o'tga yoki o'tmaganligini tekshirish
module.exports=(req,res,next)=>{
    if (req.session.userId) {
        next()
    } else {
        res.redirect('/auth/login')
    }
  }