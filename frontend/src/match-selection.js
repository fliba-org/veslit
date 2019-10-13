import React, { useState } from 'react';
import io from 'socket.io-client';
import config from './config';

const socket = io(config.host);

function MatchSelection() {
    const [matches, updateMatches] = useState([]);
    const [socketState, updateSocketState] = useState({
        connected: false,
        createdMatch: false,
    });

    socket.on('updateSocketState', s => {
        updateSocketState(s)
    });

    socket.on('updateMatches', ({matchList, createdMatch}) => {
        updateMatches(matchList);
        updateSocketState({...socketState, createdMatch});
    });

    return (<div>
    </div>);
}

export default MatchSelection;
