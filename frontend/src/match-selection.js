import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

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
        matchListWrapper: {
            margin: '0 auto',
            width: '60em',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
        },
        matchListContainer: {
            width: '100%',
        },
        playersAtMatch: {
            fontSize: '1.5em',
            fontFamily: theme.typography.fontFamily,
        },
    }))();

    const matchesEl = <List>
        <ListSubheader>Avaliable Matches</ListSubheader>
        {matches.length === 0 ? <ListItem>
            <ListItemText primary='No matches were created yet.' />
        </ListItem> : matches.map((m, i) => {
        const matchText = `${m.name}`;
        const playersAtMatch = `(${m.players.length}/${m.limit})`;
        return <div key={i}>
            <Divider />
            <ListItem
                button
            >
                <ListItemIcon>
                    {m.playing ? <PlayArrowIcon /> : <AccessTimeIcon />}
                </ListItemIcon>
                <ListItemIcon>
                    {!m.isPublic ? <LockIcon /> : <LockOpenIcon />}
                </ListItemIcon>
                <ListItemText primary={matchText} />
                <div className={classes.playersAtMatch}>{playersAtMatch}</div>
            </ListItem>
        </div>
    })}</List>;

    return (<div>
        <Typography variant='h2' className={classes.serverName}>
            {config.serverName}
        </Typography>
        { socketState.connected ? <div className={classes.matchListWrapper}>
            <Paper className={classes.matchListContainer}> {matchesEl} </Paper>
            </div> : 'Not connected :('
        }
    </div>);
}

export default MatchSelection;
