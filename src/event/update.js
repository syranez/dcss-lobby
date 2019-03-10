const Event = require('./event.js');

class Update
extends Event
{

    constructor(/* ServerInfo */ serverInfo, /* LobbyEntry */ oldMessage, /* LobbyEntry */ newMessage) {

        if (oldMessage.constructor.name !== newMessage.constructor.name) {
            throw new 'The messages have not the same type: ' + oldMessage.constructor.name + ' <=> ' + newMessage.constructor.name;
        }

        super(serverInfo, {
            username: oldMessage.username,
            game_id: oldMessage.game_id,
            id: oldMessage.id,
        });

        this.diff = [];

        Object.keys(oldMessage.message).forEach(key => {
            if (oldMessage.message[key] !== newMessage.message[key]) {
                this.diff.push({key, oldValue: oldMessage.message[key], newValue: newMessage.message[key]});
            }
        });
    }

    get username() {
        return this.message.username;
    }

    get game_id() {
        return this.message.game_id;
    }

    get id() {
        return this.message.id;
    }

    switchedBranch() {

        const placeEntry = this.diff.find(entry => entry.key === 'place');

        if (placeEntry === undefined) {
            return false;
        }

        if (placeEntry.oldValue.indexOf(':') !== -1
            && placeEntry.newValue.indexOf(':') !== -1)
        {
            const levelBefore = placeEntry.oldValue.split(':');
            const levelAfter  = placeEntry.newValue.split(':');

            return levelBefore[0] !== levelAfter[0];
        }

        return placeEntry.oldValue !== placeEntry.newValue;
    }

}

module.exports = Update;
