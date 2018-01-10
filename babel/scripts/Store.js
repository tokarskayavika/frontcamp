import Iterator from './helpers/Iterator';

export default class Store {
    constructor(reducer) {
        this.reducer = reducer;
        this.state = {};
        this.listeners = [];
    }

    getState() {
        return this.state;
    }

    dispatch(action) {
        let listeners = new Iterator(this.listeners);

        this.state = this.reducer(action);
        listeners.each(listener => listener(this.state));
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }
}