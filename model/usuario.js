const mongoose = require("mongoose")
const bcrypt = require ("bcrypt")

const tabela_usuario = mongoose.Schema({
    username:{type:String,unique:true},
    fullname:{type:String},
    email:{type:String},
    phone:{type:String},
    password:{type:String},
    createdat:{type:String, default:Date.now}

})

tabela_usuario.pre('save', function(next){
    let user = this
    if(!user.isModified('password')) return next ()
    bcrypt.hash(user.password,10,(error,hashpassword)=>{
        user.password = hashpassword;
        return next();
    })


})

module.exports = mongoose.model('usuario',tabela_usuario);