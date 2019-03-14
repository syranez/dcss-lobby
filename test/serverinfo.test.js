const assert     = require('assert');
const ServerInfo = require('../src/serverinfo.js');

describe('ServerInfo', function() {
    describe('#getWebSocketUrl', function() {

        it('https should have wss', function() {

            const serverInfo = new ServerInfo('CUE', 'https://underhound.eu:8080');
            assert.equal('wss://underhound.eu:8080/socket', serverInfo.getWebSocketUrl());
        });

        it('http should have ws', function() {

            const serverInfo = new ServerInfo('CUE', 'http://underhound.eu:8080');
            assert.equal('ws://underhound.eu:8080/socket', serverInfo.getWebSocketUrl());
        });
    });
});
