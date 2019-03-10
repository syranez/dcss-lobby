const Events = require('./events.js');

class Translator {

    constructor(/* ServerInfo */ serverInfo, /* EventEmitter */ emitter, /* Store */ store) {

        this.serverInfo = serverInfo;
        this.store      = store;
        this.emitter    = emitter;

        this.ignoreMessages = [
            'Ping',
            'LobbyClear',
            'LobbyComplete'
        ];
    }

    handle(/* Array */ messages) {

        messages.forEach(message => {

            if (this.ignoreMessages.includes(message.constructor.name)) {
                return;
            }

            switch (message.constructor.name) {
            case 'LobbyRemove':
                this.emit('stop', new Events.Stop(this.serverInfo, this.store.getById(message.id), message));
                this.store.removeById(message.id);
                break;
            case 'LobbyEntry':
                if (this.store.hasEntry(message.game_id, message.username)) {
                    this.emit('update', new Events.Update(this.serverInfo, this.store.getEntry(message.game_id, message.username), message));
                } else {
                    this.emit('start', new Events.Start(this.serverInfo, message));
                }

                this.store.push(message);
                break;
            default:
                console.error('Unhandled message "' + message.constructor.name + '".');
            }
        });
    }

    emit(/* String */ type, /* Event */ event) {

        this.emitter.emit(type, event);
    }

}

module.exports = Translator;
