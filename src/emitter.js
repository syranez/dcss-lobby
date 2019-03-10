class Emitter {

    constructor() {

        this.filter    = new Map();
        this.formatter = new Map();
        this.sinks     = new Map();
    }

    setFilter(/* Filter */ filter) {

        this.filter.set('all', filter);
    }

    setFilterForType(/* String */ type, /* Filter */ filter) {

        this.filter.set(type, filter);
    }

    setFormatter(/* String */ type, /* Formatter */ formatter) {

        this.formatter.set(type, formatter);
    }

    addSink(/* Sink */ sink) {

        if (this.sinks.has('all') === false) {
            this.sinks.set('all', []);
        }

        this.sinks.get('all').push(sink);
    }

    addSinkForType(/* String */ type, /* Sink */ sink) {

        if (this.sinks.has(type) === false) {
            this.sinks.set(type, []);
        }

        this.sinks.get(type).push(sink);
    }

    emit(/* String */ type, /* Event */ event) {

        if (this.filter.has('all')) {
            if (this.filter.get('all').filter(event)) {
                return;
            }
        }

        if (this.filter.has(type)) {
            if (this.filter.get(type).filter(event)) {
                return;
            }
        }

        let output = event;

        if (this.formatter.has(type)) {
            output = this.formatter.get(type).format(event);
        }

        if (output === null) {
            return;
        }

        if (this.sinks.has('all')) {
            this.sinks.get('all').forEach(sink => {
                sink.consume(output);
            });
        }

        if (this.sinks.has(type)) {
            this.sinks.get(type).forEach(sink => {
                sink.consume(output);
            });
        }
    }

}

module.exports = Emitter;
