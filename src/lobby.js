const Client        = require('./client.js');
const MessageParser = require('./message/parser.js');
const MessageStore  = require('./message/store.js');
const MessageBulk   = require('./message/bulk.js');
const Translator    = require('./translator.js');
const EventEmitter  = require('./emitter.js');
const ServerInfo    = require('./serverinfo.js');

class Lobby {

    constructor(/* String */ shortcut, /* string */ uri, /* object */ configuration = {}) {

        this.serverInfo = new ServerInfo(shortcut, uri);

        this.messageParser = new MessageParser();
        this.messageStore  = new MessageStore();
        this.messageBulk   = new MessageBulk(5);
        this.emitter       = new EventEmitter();
        this.translator    = new Translator(this.serverInfo, this.emitter, this.messageStore);

        this.evalConfiguration(configuration);
    }

    evalConfiguration(configuration) {

        this.reconnect = false;
        if (typeof configuration.reconnect == 'boolean') {
            this.reconnect = true;
        }

        if (typeof configuration.bulkProcessing == 'number') {
            this.messageBulk.setMax(configuration.bulkProcessing);
        }
    }

    setFormatter(/* String */ type, /* Formatter */ formatter) {

        this.emitter.setFormatter(type, formatter);
    }

    setFilter(/* Filter */ filter) {

        this.emitter.setFilter(filter);
    }

    setFilterForType(/* String */ type, /* Filter */ filter) {

        this.emitter.setFilterForType(type, filter);
    }

    addSink(/* Sink */ sink) {

        this.emitter.addSink(sink);
    }

    addSinkForType(/* String */ type, /* Sink */ sink) {

        this.emitter.addSinkForType(type, sink);
    }

    connect() {

        const client = new Client();
        client.connect(this.serverInfo.getWebSocketUrl(), 'no-compression').then(connection => {

            connection.on('error', error => {

                console.log("Connection Error: " + error.toString());
            });

            connection.on('close', () => {

                console.info('WebSocket connection closed.');

                if (this.reconnect) {
                    console.info('Reconnect WebSocket connection...');
                    this.connect();
                }
            });

            connection.on('message', message => {

                const messages = this.messageParser.parse(message);

                messages.forEach(message => {
                    this.messageBulk.add(message);
                });

                if (this.messageBulk.hasMaxReached()) {
                    this.translator.handle(this.messageBulk.get());
                    this.messageBulk.reset();
                }
            });
        });
    }

}

module.exports = Lobby;
