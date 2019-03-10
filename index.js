const Lobby   = require('./src/lobby.js');
const Console = require('./src/sink/console.js');

module.exports = {
    Lobby,
    Sink: {
        Console,
    },
};
