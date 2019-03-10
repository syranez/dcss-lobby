class ServerInfo {

    constructor(/* String */ shortcut, /* string */ url) {

        this.shortcut = shortcut;
        this.url      = new URL(url);
    }

    getWebSocketUrl() {

        return 'wss://' + this.url.host + '/socket';
    }

    getWatchUrlForUser(/* String */ user) {

        let part = '#watch-' + user;

        if (this.url.pathname.endsWith('/') === false) {
            part = '/' + part;
        }

        return this.url + part;
    }

}

module.exports = ServerInfo;
