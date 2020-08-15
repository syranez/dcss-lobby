const lodash = require('lodash');

class Type {

    constructor(/* JSON */ message) {

        this.message = message;
    }

    isEqual(/* Type */ type) {

        return lodash.isEqual(this.message, type.message);
    }

    shouldMerge(/* Type */ type) {

        return false;
    }

    shouldFlush(/* Type */ type) {

        return false;
    }

}

module.exports = Type;
