class Bulk {

    constructor(/* number */ maxCount) {

        this.setMax(maxCount);

        this.bulk = [];
    }

    setMax(/* number */ maxCount) {

        this.maxCount = maxCount;
    }

    add(/* Message */ message) {

        if (this.has(message)) {
            return;
        }

        if (this.shouldMerge(message)) {
            this.merge(message);
            return;
        }

        this.bulk.push(message);
    }

    hasMaxReached() {

        return this.bulk.length >= this.maxCount;
    }

    has(/* Message */ message) {

        const index = this.bulk.findIndex(entry => {
            return entry.isEqual(message);
        });

        return index !== -1;
    }

    shouldMerge(/* Message */ message) {

        return this.getIndex(message) !== -1;
    }

    getIndex(/* Message */ message) {

        return this.bulk.findIndex(entry => {
            return entry.shouldMerge(message);
        });
    }

    merge(/* Message */ message) {

        const index = this.getIndex(message);

        this.bulk[index] = message;
    }

    get() {

        return this.bulk;
    }

    reset() {

        this.bulk = [];
    }

}

module.exports = Bulk;
