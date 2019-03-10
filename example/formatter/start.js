class Start {

    format(/* Event */ event) {

        const parts = [];

        parts.push(`[${event.serverInfo.shortcut}]`);
        parts.push(`${event.username} ist`);
        parts.push(`im Dungeon ${event.game_id}`);

        if (event.char) {
            parts.push(`als ${event.char}`);
        }

        if (event.xl) {
            parts.push(`mit XL ${event.xl}`);
        }

        parts.push(`auf der Suche nach dem Orb.`);

        parts.push(`(Watch: ${event.serverInfo.getWatchUrlForUser(event.username)})`);

        return parts.join(' ');
    }

}

module.exports = Start;
