class Progress {

    format(/* Event */ event) {

        const changes = [];

        event.diff.forEach(change => {
            switch (change.key) {
            case 'place':
                changes.push(`ist von ${change.oldValue} nach ${change.newValue} gegangen`);
                break;
            case 'milestone':
                changes.push(`hat einen Meilenstein geschafft: "${change.newValue}"`);
                break;
            case 'title':
                changes.push(`ist nun ein "${change.newValue}"`);
                break;
            case 'xl':
                changes.push(`ist nun Level ${change.newValue}`);
                break;
            case 'idle_time':
                break;
            case 'spectator_count':
                break;
            default:
                console.warn('Unhandled: ' + change.key);
            }
        });

        if (changes.length === 0) {
            return null;
        }


        return `[${event.serverInfo.shortcut}] ${event.username} ${changes.join(' und ')}.`;
    }
}

module.exports = Progress;
