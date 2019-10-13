const io = require('socket.io')(8000);

io.on('connection', (socket) => {
    console.log('someone connected');
    socket.emit('socketId', socket.id);

    socket.on('disconnect', () => {
        console.log('someone disconnected');
    });
});
