class Stop {

    format(/* Event */ event) {

        const parts = [];

        parts.push(`[${event.serverInfo.shortcut}]`);
        parts.push(`${event.username}`);
        parts.push(`im Dungeon ${event.game_id}`);

        if (event.char) {
            parts.push(`als ${event.char}`);
        }

        if (event.xl) {
            parts.push(`mit XL ${event.xl}`);
        }

        parts.push(`pausiert auf der Suche nach dem Orb.`);

        return parts.join(' ');
    }
}

module.exports = Stop;
