class Event {

    constructor(/* String */ serverShortcut, /* JSON */ message) {

        this.serverShortcut = serverShortcut;
        this.message        = message;
    }

    get server() {

        return this.serverShortcut;
    }

}

module.exports = Event;
