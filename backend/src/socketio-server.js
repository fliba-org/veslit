import Match from './Match';
import Server from 'socket.io';

const config = require('./config.json');
const io = new Server(config.port);
const matches = {};

io.on('connection', (socket) => {
    const addr = socket.conn.remoteAddress;

    const matchesInfo = () => ({
        matchList: Object.values(matches).map(m => m.getInfo()),
        createdMatch: addr in matches,
    });

    socket.emit('updateSocketState', {
        connected: true,
        createdMatch: addr in matches,
    });

    socket.emit('updateMatches', matchesInfo());

    socket.on('matchCreation', ({ name, limit, password }) => {
        if (addr in matches) {
            socket.emit(
                'matchCreationFailed',
                'You have already created a match!',
            );
        } else if (matches.length === config.maxMatches) {
            socket.emit(
                'matchCreationFailed',
                'This server can not support more matches.',
            );
        } else {
            matches[addr] = new Match(name, limit, password);
            io.sockets.emit('updateMatches', matchesInfo());
        }
    });

    socket.on('disconnect', () => {
        console.log('someone disconnected');
    });
});
