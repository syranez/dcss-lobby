const Event = require('./event.js');

class Stop
extends Event
{

    constructor(/* ServerInfo */ serverInfo, /* LobbyEntry */ lastEntry, /* LobbyRemove */ message) {

        super(serverInfo, message);

        this.lastEntry = lastEntry;
    }

    get username() {
        return this.lastEntry.username;
    }

    get xl() {
        return this.lastEntry.xl;
    }

    get title() {
        return this.lastEntry.title;
    }

    get spectator_count() {
        return this.lastEntry.spectator_count;
    }

    get idle_time() {
        return this.lastEntry.idle_time;
    }

    get char() {
        return this.lastEntry.char;
    }

    get place() {
        return this.lastEntry.place;
    }

    get game_id() {
        return this.lastEntry.game_id;
    }

    get id() {
        return this.lastEntry.id;
    }

}

module.exports = Stop;
