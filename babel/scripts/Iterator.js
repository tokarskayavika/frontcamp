export default class Iterator {
    constructor(items) {
        this.index = 0;
        this.items = items;
    }

    next() {
        return this.items[this.index++];
    }

    hasNext() {
        return this.index <= this.items.length;
    }

    first() {
        this.index = 0;
        return this.next();
    }

    each(callback) {
        for (let item = this.first(); this.hasNext(); item = this.next()) {
            callback(item);
        }
    }
}