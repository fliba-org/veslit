import React, { useState } from 'react';
import io from 'socket.io-client';
import config from './config';

const socket = io(config.host);

function MatchSelection() {
    const [socketId, updateSocketId] = useState('');

    socket.on('socketId', id => { updateSocketId(id) })
    return <div>Socket id: { socketId }</div>;
}

export default MatchSelection;
