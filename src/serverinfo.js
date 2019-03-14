class ServerInfo {

    constructor(/* String */ shortcut, /* string */ url) {

        this.shortcut = shortcut;
        this.url      = new URL(url);
    }

    getWebSocketUrl() {

        let protocol = 'ws:';

        if (this.url.protocol === 'https:') {
            protocol = 'wss:'
        }

        return protocol + '//' + this.url.host + '/socket';
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
