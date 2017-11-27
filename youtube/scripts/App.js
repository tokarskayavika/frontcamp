import * as Constants from './constants';
import NewsItem from './NewsItem';

export default class Application {
    constructor() {
        this.sources = Constants.sources;
        this.apiKey = Constants.apiKey;
    }

    initialize() {
        this.renderSourceList();
        this.initListeners();
    }

    initListeners() {
        let sourceList = document.getElementById('source-list');
        sourceList.addEventListener('click', (e) => this.sendRequest(e));

        document.querySelector('#source-list > li').click();
    }

    renderSourceList() {
        let sourceList = document.getElementById('source-list');
        let sources = this.sources;

        for (let i = 0; i < sources.length; i++) {
            let sourceElement = document.createElement('li');
            sourceElement.dataset.id = sources[i].id;
            sourceElement.innerHTML = sources[i].name;

            sourceList.appendChild(sourceElement);
        }
    }

    renderNewsItems(newsItems, activeSource) {
        let newsSection = document.getElementById('feed');
        let sources = document.querySelectorAll('#source-list li');
        newsSection.innerHTML = "";

        for(let i = 0; i < sources.length; i++) {
            sources[i].classList.remove('active');
        }
        activeSource.classList.add('active');

        for(let i = 0; i < newsItems.length; i++) {
            let newsItem = new NewsItem(newsItems[i]);
            newsSection.appendChild(newsItem.render());
        }
    }

    sendRequest(event) {
        let activeSource = event.target;
        let promise = fetch(`https://newsapi.org/v1/articles?source=${activeSource.dataset.id}&apiKey=${this.apiKey}`);
        
        promise.then((response) => response.json()).then((data) => {
            this.renderNewsItems(data.articles, activeSource)}).catch(alert);
    }
}