const mongoose = require("mongoose");

const tabela_manager = mongoose.Schema({
    userid:{type:String},
    username:{type:String},
    email:{type:String},
    information:[{}],
    datalogin:{type:String, default:Date.now}

})

module.exports = mongoose.model('manager_manager',tabela_manager)