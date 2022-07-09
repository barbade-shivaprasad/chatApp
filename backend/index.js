const express = require('express');
const http = require('http')
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const cors = require('cors');
const Routes = require('./Routes');
const userModel = require('./models/user');
const userService = require('./services/userServices');
const { updateChat } = require('./Routes');
const axios = require('axios')

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ origin: '*', credentials: true }));

mongoose.connect('mongodb+srv://Shiva:Rgukt123@cluster0.juncu.mongodb.net/chatapp?retryWrites=true&w=majority')
// mongoose.connect('mongodb://localhost:27017/chatapp')
mongoose.connect('',()=>{
  console.log("connected")
})

//Routes
app.post('/newuser',Routes.newUser);
app.get('/',Routes.home);
app.post('/old',Routes.old);
app.post('/addfriend',Routes.addFriend);
app.post('/getfriends',Routes.getFriends);
app.post('/getchat',Routes.getChat);
app.post('/updateCount',Routes.changeUnreadCount);


const server = http.createServer(app);


let io = new Server(server,{
  cors:{
    origin:'*'
  }
});

io.on('connection',(socket)=>{
  socket.on('connected',async(email)=>{
      
    await userModel.updateOne({email:email},{socId:socket.id})
  })

  

  socket.on('sendMessage',async(email,remail,message,key)=>{
    console.log(key)
      let socId = await userService.getSocId(remail);

      let res = await updateChat(email,remail,message);
      if(res){

        socket.to(socId).emit('receiveMessage',email,message,key);
        console.log("shiva")
      }
  })
})

// setInterval(() => {
//   keepAlive();
// }, 50000);

// const keepAlive = async()=>{
//   try{

//     let res = await axios.get('https://chat-app-sp-backend.herokuapp.com')
//     console.log(res.data)
//     await axios.get('https://chat-app-web1.herokuapp.com/')
//   }
//   catch(err){
//     console.log(err)
//   }
// }

server.listen(process.env.PORT || '5000' , ()=>{
  console.log("Server started");
})