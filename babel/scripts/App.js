import * as Constants from './constants';
import NewsItem from './NewsItem';

export default class Application {
    constructor() {
        this.sources = Constants.sources;
        this.apiKey = Constants.apiKey;
        this.activeSourceId = this.sources[0].id;
    }

    initialize() {
        this.renderSourceList();
        this.changeSource(this.activeSourceId);
    }

    renderSourceList() {
        let sourceList = document.getElementById('source-list');

        this.sources.forEach((source) => {
            let sourceElement = document.createElement('li');
            sourceElement.id = source.id;
            sourceElement.innerHTML = source.name;
            sourceElement.addEventListener('click', () => this.changeSource(source.id));

            sourceList.appendChild(sourceElement);
        });
    }

    renderNewsItems(newsItems) {
        let newsSection = document.getElementById('feed');
        newsSection.innerHTML = "";

        newsItems.forEach((item) => {
            let newsItem = new NewsItem(item);
            newsSection.appendChild(newsItem.render());
        });
    }

    changeSource(activeSourceId) {
        let activeSource = document.getElementById(activeSourceId);
        let previousActiveSource = document.getElementById(this.activeSourceId);

        this.sendRequest(activeSourceId);

        previousActiveSource.classList.remove('active');
        activeSource.classList.add('active');
        this.activeSourceId = activeSourceId;
    }

    sendRequest(id) {
        let promise = fetch(`https://newsapi.org/v1/articles?source=${id}&apiKey=${this.apiKey}`);
        
        promise.then((response) => response.json()).then((data) => {
            this.renderNewsItems(data.articles)}).catch(alert);
    }
}