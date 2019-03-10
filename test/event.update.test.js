const assert     = require('assert');
const ServerInfo = require('../src/serverinfo.js');
const LobbyEntry = require('../src/message/type/lobbyentry.js');
const Update     = require('../src/event/update.js');

const swampOne = new LobbyEntry({
    'place': 'Swamp:1',
});

const swampTwo = new LobbyEntry({
    'place': 'Swamp:1',
});

const serverInfo = new ServerInfo('CUE', 'https://underhound.eu:8080');

describe('Update', function() {
    describe('#switchedBranch', function() {

        it('same level', function() {

            const update = new Update(serverInfo, swampTwo, swampTwo);
            assert.equal(false, update.switchedBranch());
        });

        it('same branch', function() {

            const update = new Update(serverInfo, swampOne, swampTwo);
            assert.equal(false, update.switchedBranch());
        });

        it('portal', function() {

            const newMessage = new LobbyEntry({
                'place': 'Ice Cave',
            });

            const update = new Update(serverInfo, swampOne, newMessage);
            assert.equal(true, update.switchedBranch());
        });

        it('switched a branch', function() {

            const newMessage = new LobbyEntry({
                'place': 'Lair:4',
            });

            const update = new Update(serverInfo, swampOne, newMessage);
            assert.equal(true, update.switchedBranch());
        });
    });
});
