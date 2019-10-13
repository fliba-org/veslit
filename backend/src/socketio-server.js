import Server from 'socket.io';

const config = require('./config.json');
const io = new Server(config.port);

io.on('connection', (socket) => {
    console.log('someone connected');
    socket.emit('socketId', socket.id);

    socket.on('disconnect', () => {
        console.log('someone disconnected');
    });
});
