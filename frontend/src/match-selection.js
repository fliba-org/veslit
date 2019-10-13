import React, { useState } from 'react';
import io from 'socket.io-client';
import config from './config';

const socket = io(config.host);

function MatchSelection() {

    return (<div>
    </div>);
}

export default MatchSelection;
