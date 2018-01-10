export default class Proxy {
    constructor(id) {
        this.activeSourceId = id;
    }

    getData() {
        return this.activeSourceId;
    }

    updateData(id) {
        this.activeSourceId = id;
    }
}