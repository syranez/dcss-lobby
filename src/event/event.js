class Event {

    constructor(/* ServerInfo */ serverInfo, /* JSON */ message) {

        this.serverInfo = serverInfo;
        this.message    = message;
    }

}

module.exports = Event;
