const { default: mongoose } = require("mongoose");
const chatSchema = require('./chat')

const schema = new mongoose.Schema({name:String,socId:String,email:String,chat:[{name:String,email:String,unreadCount:Number,data:[chatSchema.schema]}]})

const userModel = new mongoose.model('user',schema);

module.exports = userModel;