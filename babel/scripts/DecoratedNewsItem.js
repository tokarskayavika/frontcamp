export default class DecoratedNewsItem {
    constructor(newsElement) {
        this.innerElement = newsElement;
    }

    render() {
        let wrapper = document.createElement('div');
        wrapper.classList.add('decorated-news-wrapper');
        wrapper.appendChild(this.innerElement);

        return wrapper;
    }
}