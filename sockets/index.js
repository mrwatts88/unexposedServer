module.exports = io => {
  io.on('connection', function(socket) {
    console.log('new client connected')
    socket.on('message', function(data) {
      io.emit('message', { data })
      console.log(data)
    })
  })
}
