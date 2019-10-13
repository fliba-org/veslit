import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

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

    const classes = makeStyles(theme => ({
        serverName: {
            margin: '0.8em auto',
            textAlign: 'center',
        },
    }))();

    return (<div>
        <Typography variant='h2' className={classes.serverName}>
            {config.serverName}
        </Typography>
    </div>);
}

export default MatchSelection;
