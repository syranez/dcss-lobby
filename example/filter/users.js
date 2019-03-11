class Users {

    filter(/* Event */ event) {

        if (typeof event.username == 'undefined') {
            return true;
        }

        const interestedUsernames = [
            'syranez',
            'Plasmo',
        ];

        return !interestedUsernames.includes(event.username);
    }

}

module.exports = Users;
