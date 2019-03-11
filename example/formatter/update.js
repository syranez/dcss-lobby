class Progress {

    format(/* Event */ event) {

        const changes = [];

        event.diff.forEach(change => {
            switch (change.key) {
            case 'milestone':
                changes.push(`hat einen Meilenstein geschafft: "${change.newValue}"`);
                break;
            default:
                /* ignore all other */
            }
        });

        if (changes.length === 0) {
            return null;
        }

        return `[${event.serverInfo.shortcut}] ${event.username} ${changes.join(' und ')}.`;
    }
}

module.exports = Progress;
