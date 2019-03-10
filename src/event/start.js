const Event = require('./event.js');

class Start
extends Event
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

}

module.exports = Start;
