const Types = require('./types.js');

class Parser {

    constructor() {

        this.mapping = {
            ping:           'Ping',
            lobby_clear:    'LobbyClear',
            lobby_complete: 'LobbyComplete',
            lobby_entry:    'LobbyEntry',
            lobby_remove:   'LobbyRemove',
        }
    }

    parse(message) {

        const pm = [];

        if (message.type !== 'utf8') {
            return pm;
        }

        const data = JSON.parse(message.utf8Data);

        if (typeof data.msgs == 'undefined') {
            console.error(data);
            console.error(typeof data);
            console.error('No msgs-Property!' + data);
            return pm;
        }

        data.msgs.forEach(message => {

            if (typeof this.mapping[message.msg] == 'undefined') {
                console.error('Unhandled type "' + message.msg + '".');
            } else {
                pm.push(new Types[this.mapping[message.msg]](message));
            }
        });

        return pm;
    }

}

module.exports = Parser;
