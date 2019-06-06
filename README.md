# dcss-lobby

dcss-lobby connects to a [Dungeon Crawl Stone Soup] WebTiles server and gives you all game events - the same which are shown in the lobby.

# Features

 - automatic conversion of messages to game events
 - configurable reconnect after timeout
 - filter events
 - multiple sinks
 - noise protection

# Usage

```js
const Lobby = require('dcss-lobby');

const lobby = new Lobby.Lobby('CUE', 'https://underhound.eu:8080/', {
    reconnect:      true,
    bulkProcessing: 3,
});

lobby.setSink(new Lobby.Sink.Console());
lobby.connect();
```

You can find a complete example in example/.

# Example output

```sh
[CUE] OdinFK ist nun ein "Firebug".
[CUE] Freyura ist von D:4 nach D:5 gegangen.
[CUE] P0WERM0DE ist nun ein "Chopper".
[CUE] PentaManta ist von D:2 nach D:3 gegangen.
[CUE] iamserjio hat einen Meilenstein geschafft: "killed Jessica.".
[CUE] P0WERM0DE hat einen Meilenstein geschafft: "became a worshipper of Makhleb.".
[CUE] Freyura ist nun Level 8.
[CUE] OdinFK ist von D:4 nach D:5 gegangen.
[CUE] P0WERM0DE ist nun Level 7 und ist von D:4 nach D:5 gegangen.
[CUE] Ge0ff ist von Crypt:3 nach Crypt:2 gegangen.
[CUE] Ge0ff ist von Crypt:2 nach Crypt:3 gegangen.
[CUE] iamserjio ist nun Level 6.
[CUE] Artagas ist von Elf:2 nach Desolation gegangen.
[CUE] iamserjio wird nicht mehr beobachtet.
[CUE] iamserjio  im Dungeon dcss-git als OpCK mit XL 6 pausiert auf der Suche nach dem Orb.
[CUE] FreshCat ist von Dis:4 nach Dis:5 gegangen.
[CUE] iamserjio ist im Dungeon dcss-git als OpCK mit XL 1 auf der Suche nach dem Orb.
[CUE] KamiKatze ist im Dungeon dcss-0.23 als CeHu mit XL 2 auf der Suche nach dem Orb.
[CUE] P0WERM0DE ist nun Level 8.
[CUE] P0WERM0DE ist von D:5 nach D:6 gegangen und hat einen Meilenstein geschafft: "killed Eustachio.".
[CUE] iamserjio ist nun ein "Skirmisher".
[CUE] dstrtn ist von D:3 nach D:2 gegangen.
```

# Installation

```sh
npm install dcss-lobby
```

# Architecture

**Client** wraps the WebSocket connection. The WebSocket connection transmits messages. The **MessageParser** parses the messages and creates **Message**-Objects. These objects are stored in a **MessageStore**. The **MessageBulk** tries to summarize messages to reduce spam. After the **MessageBulk** got max messages, the messages are given to **Translator**, which converts the messages to game **Event** objects and puts them on the **Emitter**. The **Emitter** filters and formats events and puts them in a sink e. g. console.

**Lobby** is the main interaction object. It handles all the above mentioned things. A lobby needs the shortcut for a Dungeon Crawl Stone Soup WebTiles server and the servers WebSocket URL and can have an optionally configuration object:

```js
const lobby = new Lobby(/* server shortcut */ 'CUE', /* server url */ 'https://underhound.eu:8080/', {
    reconnect: boolean // do reconnect after disconnect
    bulkProcessing: number // number of max messages in MessageBulk
});
```

You can filter the events you are interested in:

```js

class EverySecond {

    constructor() {
        this.toggle = false;
    }

    filter(/* Event */ event) {
        this.toggle = !this.toggle;
        return this.toggle;
    }

}


class OnlyUpdateEventsFromSyranez {

    filter(/* Update */ event) {
        return event.username === 'syranez';
    }

}

// Filter is triggered on every event
lobby.setFilter(new EverySecond());

// Filter is triggered only on update events
lobby.setFilterForType(/* event type */ 'update', new OnlyUpdateEventsFromSyranez());
```

You can format the events you are interested in:

```js

class UpdateFormatter {

    format(/* Update */ event) {
        return `Hey, new update from ${event.username}! \o/`;
    }

}

// format the Update event
lobby.setFormatterForType(/* event type */ 'update', new UpdateFormatter());
```
You can then output the event. If the event was previously formatted, the **Sink** will get a string not an **Event**.

```js

// for all (formatted) events
lobby.setSink(new Lobby.Sink.Console());

// for (formatted) event types
lobby.setSinkForType('update', new Lobby.Sink.Console());
```

## Game Event Types

### start

Emitted if someone starts or continues a game.

key | meaning
----|--------
username | Name of player
xl | Experience Level
title | Current title
spectator_count | Count of spectators
idle_time | Idle time
char | Character
place | Current location
game_id | Game version
id | Process id of current game

Source: *src/event/start.js*

### update

Emitted if something interesting happend in someones game.

key | meaning
----|--------
username | Name of player
game_id | Game version
id | Process id of current game
diff | Array with all changes
switchedBranch() | Returns *true* if player switched the dungeon branch, otherwise *false*

diff is an array with all changes where change is an object with this

key | meaning
----|--------
key | Name of changed value (can be: xl, title, spectator_count, idle_time, char, place)
oldValue | Value before
newValue | current value

Source: *src/event/update.js*

### stop

Emitted if the game is stopped.

key | meaning
----|--------
username | Name of player
xl | Experience Level
title | Current title
spectator_count | Count of spectators
idle_time | Idle time
char | Character
place | Current location
game_id | Game version
id | Process id of current game

Source: *src/event/stop.js*

# License

MIT

[//]:

  [Dungeon Crawl Stone Soup]: <https://crawl.develz.org>
