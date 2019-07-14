const express =require("express")
const mongoose = require("mongoose")
const cookieParser=require("cookie-parser")
//const logger=require("morgan")
const cors=require("cors")

const _ = require('lodash');

const app=express();
app.use(cors());


const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
require('./socket/streams')(io);
require("./socket/private")(io)



const dbConfig=require("./config/secret")

const auth=require("./routes/authRoute");
const posts= require("./routes/postRoute")
const users=require("./routes/userRoute")
const friends=require("./routes/friendsRoute")
const message=require("./routes/messageRoute")

// app.use((req,res,next)=>{
//   res.header("Access-Control-Allow-Origin","*");
//   res.header("Access-Control-Allow-Credentials","true");
//   res.header("Access-Control-Allow-Methods",'GET','POST','DELETE','PUT','OPTION');4
//   res.header(
//       'Access-Control-Allow-Headers',
//       'Origin,X-Requested-With,Content-Type,Accept,Authorization'
//   );
//   next();
// })

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true,limit:'50mb'}))
app.use(cookieParser());
//app.use(logger('dev'))
mongoose.promise=global.promise;
mongoose.connect(
    dbConfig.url,
    { useNewUrlParser: true }
    );



    app.use("/api/chatapp",auth);
    app.use("/api/chatapp",posts)
    app.use("/api/chatapp",users);
    app.use("/api/chatapp",friends)
    app.use("/api/chatapp",message)


server.listen(3000,()=>{
    console.log("Running 3000!!")
})