import React from 'react';
import openSocket from 'socket.io-client';
import config from './config';

const socket = openSocket(config.host);

function MatchSelection() {
    return 'Hi there';
}

export default MatchSelection;
