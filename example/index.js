const Lobby     = require('../index.js');
const Formatter = require('./formatter.js');
const Users     = require('./filter/users.js');

const lobby = new Lobby.Lobby('CUE', 'wss://underhound.eu:8080/socket', {
    reconnect:      true,
    bulkProcessing: 3,
});

// lobby.setFilter(new Users());

lobby.setFormatter('stop', new Formatter.Stop());
lobby.setFormatter('start', new Formatter.Start());
lobby.setFormatter('update', new Formatter.Update());

lobby.addSink(new Lobby.Sink.Console());

lobby.connect();
