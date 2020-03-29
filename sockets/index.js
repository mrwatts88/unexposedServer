module.exports = io => {
  io.on('connection', function(socket) {
    console.log('new client connected')
    console.log(Object.keys(io.sockets.sockets))
    // console.log(io.sockets.clients()[1])
    socket.on('message', function(data) {
      io.emit('message', { data })
      console.log(data)
    })
    
    socket.on("call-user", data => {
      console.log(Object.keys(io.sockets.sockets)[1], " Calling user.");
      // console.log(data.offer, " Data offer");
      console.log("FROM: ", socket.id, "Socket ID");
      socket.to(Object.keys(io.sockets.sockets)[1]).emit("call-made", {
        offer: data.offer,
        socket: socket.id
      });
    });

    socket.on("make-answer", data => {
      console.log(data.to, " Data to.");
      // console.log(data.answer, "Data answer");
      console.log("FROM: ", socket.id, "Socket ID");
      socket.to(data.to).emit("answer-made", {
        socket: socket.id,
        answer: data.answer
      });
    });

  })
}
