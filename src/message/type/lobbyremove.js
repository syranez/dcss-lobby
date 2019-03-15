const Type = require('./type.js');

class LobbyRemove
extends Type
{

    get id() {
        return this.message.id;
    }

    shouldFlush(/* Type */ type) {

        return true;
    }
}

module.exports = LobbyRemove;
