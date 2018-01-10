import * as Constants from './constants';
import Proxy from './helpers/Proxy';
import Iterator from './helpers/Iterator';
import Store from './Store';
import reducer from './Reducer';
import NewsCreator from './NewsCreator';

export default class Application {
    constructor() {
        this.sources = Constants.sources;
        this.applicationStore = new Store(reducer);
        this.proxy = new Proxy(this.sources[0].id);
        this.apiKey = Constants.apiKey;
    }

    initialize() {
        this.renderSourceList();
        this.applicationStore.subscribe(this.renderNewsItems);
        this.changeSource(this.proxy.getData());
    }

    renderSourceList() {
        let sourceList = document.getElementById('source-list');
        let sourcesIterator = new Iterator(this.sources);

        sourcesIterator.each((source) => {
            let sourceElement = document.createElement('li');
            sourceElement.id = source.id;
            sourceElement.innerHTML = source.name;
            sourceElement.addEventListener('click', () => this.changeSource(source.id));

            sourceList.appendChild(sourceElement);
        });
    }

    renderNewsItems(state) {
        let newsIterator = new Iterator(state.news);
        let newsSection = document.getElementById('feed');
        newsSection.innerHTML = "";

        newsIterator.each((item) => {
            let newsItem = new NewsCreator(item, state);
            newsSection.appendChild(newsItem.render());
        });
    }

    changeSource(activeSourceId) {
        let activeSource = document.getElementById(activeSourceId);
        let previousActiveSource = document.getElementById(this.proxy.getData());

        this.sendRequest(activeSource.id);

        previousActiveSource.classList.remove('active');
        activeSource.classList.add('active');
        this.proxy.updateData(activeSourceId);
    }

    async sendRequest(id) {
        try {
            let promise = await fetch(`https://newsapi.org/v1/articles?source=${id}&apiKey=${this.apiKey}`);
            let data = await promise.json();
            let newsType;

            if (id === this.sources[0].id) {
                newsType = Constants.defaultType;
            }

            this.applicationStore.dispatch({
                type: 'GET_NEWS',
                news: data.articles,
                newsType: newsType
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
}