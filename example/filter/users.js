class Users {

    filter(/* Event */ event) {

        if (typeof event.username == 'undefined') {
            return true;
        }

        const interestedUsernames = [
            'MirrMurr',
            'Zigma',
        ];

        return !interestedUsernames.includes(event.username);
    }

}

module.exports = Users;
