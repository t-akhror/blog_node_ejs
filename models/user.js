const {Schema, model}=require('mongoose');
const bcrypt =require('bcrypt');

const userSchema=new Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
});

// parolni hashlash
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()

    this.password=await bcrypt.hash(this.password,12)
    next()
});

// parolni tekshirish
userSchema.methods.comparePassword=function(inputPassword){
    return bcrypt.compare(inputPassword,this.password)
}

module.exports=model('User',userSchema)