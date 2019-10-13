import React, { useState } from 'react';
import io from 'socket.io-client';
import config from './config';

const socket = io(config.host);

function MatchSelection() {
    const [socketState, updateSocketState] = useState({
        connected: false,
        createdMatch: false,
    });

    socket.on('updateSocketState', s => {
        updateSocketState(s)
    });


    return (<div>
    </div>);
}

export default MatchSelection;
