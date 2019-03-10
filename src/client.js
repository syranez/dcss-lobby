const WebSocketClient = require('websocket').client;

class Client {

    constructor() {

        this.client = new WebSocketClient();
    }

    connect(url, t) {

        return new Promise((resolve, reject) => {

            this.client.on('connectFailed', function(error) {

                reject(error);
            });

            this.client.on('connect', function(connection) {
                resolve(connection);
            });

            this.client.connect(url, t);
        });
    }

}

module.exports = Client;
