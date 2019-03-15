class Bulk {

    constructor(/* number */ maxCount) {

        this.setMax(maxCount);

        this.bulk    = [];
        this.counter = 0;
        this.flush   = false;
    }

    setMax(/* number */ maxCount) {

        this.maxCount = maxCount;
    }

    add(/* Message */ message) {

        if (this.has(message)) {
            return;
        }

        this.counter += 1;

        if (this.shouldMerge(message)) {
            this.merge(message);
            return;
        }

        if (message.shouldFlush()) {
            this.flush = true;
        }

        this.bulk.push(message);
    }

    shouldFetch() {

        return this.hasMaxReached() || this.flush;
    }

    hasMaxReached() {

        return this.counter >= this.maxCount;
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

    fetch() {

        return this.bulk;
    }

    reset() {

        this.bulk    = [];
        this.counter = 0;
        this.flush   = false;
    }

}

module.exports = Bulk;
