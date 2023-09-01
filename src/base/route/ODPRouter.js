export class ODPRouter {
    constructor(history) {
        this.history = history;
    }
    static create({ history }) {
        return new ODPRouter(history);
    }
    navigateTo(route) {
        this.history.push(route);
    }
}
