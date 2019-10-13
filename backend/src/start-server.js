require('@babel/register')({
    presets: ['@babel/preset-env']
});

module.exports = require('./socketio-server.js');
