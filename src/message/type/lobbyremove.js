const Type = require('./type.js');

class LobbyRemove
extends Type
{

    get id() {
        return this.message.id;
    }

}

module.exports = LobbyRemove;
