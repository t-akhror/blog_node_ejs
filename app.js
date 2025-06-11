require('dotenv').config();
const express=require('express');
const mongoose =require('mongoose')
const session=require('express-session')
const postRouter=require('./routes/postRouter')
const authRouter=require('./routes/authRouter')
const methodOverride = require('method-override');


const app=express();

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));

// ejs konfiguratsiya
app.set('view engine', 'ejs')

// connection to DB
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('DB connected');
    app.listen(3000)
})
.catch((err)=>{
    console.error('MongoDB ulanishida xatolik:', err);
})

app.use(session({
    secret:'maxfiy_soz',
    resave:false,
    saveUninitialized:false
}))

// Identifikatsiyadan o'tgan foydalanuvchini localsga saqlab qo'yish
app.use((req, res, next) => {
    res.locals.user = {
        userId:req.session.userId ,
        username:req.session.username
    }
    next();
  });

//  Home page 
app.get('/',(req,res)=>{
    console.log(req.session.userId)
    res.render('index')
})

// About page
app.get('/about',(req,res)=>{
    res.render('about')
})

// blog
 app.use('/posts',postRouter);

//  auth
app.use('/auth',authRouter)

// logout formasi
app.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.send('Logoutda xatolik yuz berdi')
        }
        res.redirect('/auth/login')
    })
})
app.use('/',(req,res)=>{
    res.status(404).render('404')
})



// app.get('/add-blog',async (req,res)=>{    
//     await Blog.insertMany(data)
//     .then((result)=>{
//         console.log('Data inserted',data)
//         res.send('added')
//     })
//     .catch((err)=>{console.log(err)}) 
// })

