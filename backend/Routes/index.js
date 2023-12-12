const { default: mongoose } = require('mongoose')
const userModel = require('../models/user')
const {chatModel} = require('../models/chat')

class Test{
    static newUser=async(req,res)=>{
        try{

            let result = await userModel.exists({email:req.body.email})

            if(result)
            throw new Error("User already exists")
            
            let model = new userModel(req.body);
            await model.save();
            res.send("success")
        }
        catch(err){
            console.log(err);
            res.status(202).send("Something went wrong/User already exists");
        }
    }


    static old=async(req,res)=>{

        try{

            let result = await userModel.exists({email:req.body.email})
            
            if(result){
                let name = await userModel.aggregate([{$match:{email:req.body.email}},{$project:{name:1,_id:0}}])
                res.send(name[0].name);
            }
            else
            throw new Error('User not found')
        }
        catch(err){
            console.log(err)
            res.status(202).send(err.message);
        }

    }
    static home=(req,res)=>{
        res.send("hello");
    }

    static getFriends=async(req,res)=>{
        try{
            let pipeline = [{$match:{email:req.body.email}},{$project:{'chat.name':1,'chat.email':1,'chat.unreadCount':1,_id:0}}]
            let result = await userModel.aggregate(pipeline);
            res.send(result[0].chat)
        }
        catch(err){
            res.status(202).send("something went wrong!")
        }
    }
    static getChat=async(req,res)=>{

        try{

            let pipeline = [{$match:{email:req.body.email}},{$unwind:"$chat"},{$match:{"chat.email":req.body.remail}},{$project:{_id:0,chat:1}}]
            let result = await userModel.aggregate(pipeline);
            res.send(result[0])
        }
        catch(err){
            console.log(err)
            res.status(202).send(err.message)
        }
    }

    static updateChat=async(sender,reciever,message)=>{
        try{

            let sentObj = chatModel({sender:"me",message:message});
            let receivedObj = chatModel({sender:"you",message:message});
            await userModel.updateOne(
                {email:sender},
                {$push:{"chat.$[e].data":sentObj}},
                {arrayFilters:[{'e.email':reciever}],upsert:true}
            )
            await userModel.updateOne(
                {email:reciever},
                {$push:{"chat.$[e].data":receivedObj}},
                {arrayFilters:[{'e.email':sender}],upsert:true}
            )
            return true
        }
        catch(err){
            console.log(err)
            return false
        }
    }
    
    static addFriend=async(req,res)=>{

        try{

            let name = await userModel.aggregate([{$match:{email:req.body.remail}},{$project:{name:1,_id:0}}])
            let t1 = {
                email:req.body.remail,
                name:name[0].name,
                unreadCount:0,
                data:[]
            }

            let t2 = {
                email:req.body.email,
                name:req.body.name,
                unreadCount:0,
                data:[]
            }
            await userModel.updateOne(
                {email:req.body.email},
                {$push:{chat:t1}}
            )
            await userModel.updateOne(
                {email:req.body.remail},
                {$push:{chat:t2}}
            )

            res.send("Success");
        }
        catch(err){
            console.log(err);
            res.status(202).send("User not found or Something went wrong");
        }
    }
    static changeUnreadCount=async(req,res)=>{
        try{
            
            await userModel.updateOne(
                {email:req.body.email},
                {$set:{"chat.$[e].unreadCount":req.body.count}},
                {arrayFilters:[{'e.email':req.body.remail}],upsert:true}
            )
            res.send('success');
        }
        catch(err){
            console.log(err);
        }
    }
    
}

module.exports = Test;