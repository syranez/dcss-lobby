class Store {

    constructor() {

        this.versions = new Map();
        this.ids      = new Map();
    }

    removeById(/* number */ id) {

        const identifier = this.ids.get(id);

        this.versions.get(identifier.game_id).delete(identifier.username);

        if (this.versions.get(identifier.game_id).size === 0) {
            this.versions.delete(identifier.game_id);
        }

        this.ids.delete(id);
    }

    getById(/* number */ id) {

        if (this.ids.has(id) === false) {
            throw 'There is no message for id "' + id + '".';
        }

        const identifier = this.ids.get(id);

        return this.versions.get(identifier.game_id).get(identifier.username);
    }

    push(/* LobbyEntry */ message) {

        if (this.versions.has(message.game_id) === false) {
            this.versions.set(message.game_id, new Map());
        }

        this.versions.get(message.game_id).set(message.username, message);

        this.ids.set(message.id, {game_id: message.game_id, username: message.username});
    }

    hasEntry(/* string */ game_id, /* string */ username) {

        if (this.versions.has(game_id) === false) {
            return false;
        }

        return this.versions.get(game_id).has(username);
    }

    getEntry(/* string */ game_id, /* string */ username) {

        if (this.hasEntry(game_id, username) === false) {
            throw `No entry for game_id "${game_id}" and username "${username}".`;
        }

        return this.versions.get(game_id).get(username);
    }

}

module.exports = Store;
