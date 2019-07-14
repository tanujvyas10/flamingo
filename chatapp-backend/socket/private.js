module.exports=function(io){
    io.on('connection',socket=>{
        console.log("User connected");

        socket.on('join chat',(params)=>{
            console.log(params)
            socket.join(params.room1);
            socket.join(params.room2)
        })

        socket.on('start_typing',(data)=>{
            console.log("start typing in private js",data)
            io.to(data.receiver).emit('is_typing',data);
        })

        socket.on('stop_typing',(data)=>{
            console.log("stop typing in private js",data)
            io.to(data.receiver).emit('has_stoped',data);
        })
    })


}