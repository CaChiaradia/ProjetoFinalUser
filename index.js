const express = require ("express");
const cors = require ("cors");
const mongoose = require("mongoose");
const bcrypt = require ("bcrypt");
const manageruser = require("./model/managerusuario");
const usuario = require("./model/usuario")
const create_token = require("./utils/token");
const jwt = require('jsonwebtoken');
const cfg = require('./config/config');
const { findOne } = require("./model/managerusuario");
const app = express();

app.use(express.json());
app.use(cors());

const url = "mongodb+srv://carolina:aluna1234@projetombafinal.9hao4.mongodb.net/ProjetoMbaFinal?retryWrites=true&w=majority"

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})

app.get("/",(req,res)=>{
    res.send({output:req.headers})

});


app.post("/api/user/add",(res,req)=>{

    const data = new username (res,body);
    data.save().then((data)=>{
        res.status(201).send({output:`Novo usuario Inserido`, payload:data})

    }).catch((error)=>res.status(400).send({output:`Cadastro não realizado -> ${error}`}))

});

app.post("/api/user/login",(res,req)=>{
    const usuario = req.body.username;
    const senha = req.body.passoword

    console.log(`${usuario} - ${senha}`)

    User.findOne({username:usuario},(error,data)=>{
        console.log(data)
        if(error) return res.status(400).send({output:'Erro ao tentar localizar o usuario'})
        if(!data) return res.status(040).send({output:'Usuario não localizado'})

        bcrypt.compare(senha,data.passoword,(error,igual)=>{
            if(error) return res.status(500).send({output:'Erro interno na validação da senha'})
            if(!igual) return res.status(400).send({output:'A senha não é valida'})
            
            const token = create_token(data._id, data.username);
            const info = new manageruser({userid:data._id, username:data.username, information:req.headers})

            info.save();
            res.status(200).send({output:'Autenticado', payload:data, token:token})
            
        })
    })

})

app.listen(4000,()=>console.log("Servido online em http://localhost:4000"));
