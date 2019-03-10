const isEqual = require('lodash.isequal');

class Type {

    constructor(/* JSON */ message) {

        this.message = message;
    }

    isEqual(/* Type */ type) {

        return isEqual(this.message, type.message);
    }

    shouldMerge(/* Type */ type) {

        return false;
    }

}

module.exports = Type;
