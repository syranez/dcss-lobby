const Type = require('./type.js');

class LobbyEntry
extends Type
{

    get username() {
        return this.message.username;
    }

    get xl() {
        return this.message.xl;
    }

    get title() {
        return this.message.title;
    }

    get spectator_count() {
        return this.message.spectator_count;
    }

    get idle_time() {
        return this.message.idle_time;
    }

    get char() {
        return this.message.char;
    }

    get place() {
        return this.message.place;
    }

    get game_id() {
        return this.message.game_id;
    }

    get id() {
        return this.message.id;
    }

    shouldMerge(/* Type */ type) {

        return this.username === type.username
            && this.game_id === type.game_id;
    }

}

module.exports = LobbyEntry;
