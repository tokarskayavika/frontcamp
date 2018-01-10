import NewsItem from './NewsItem';
import DecoratedNewsItem from './DecoratedNewsItem';
import * as Constants from './constants';

export default class NewsCreator {
    constructor(news, state) {
        this.news = news;
        this.newsType = state.newsType;
    }

    createNews() {
        return new NewsItem(this.news);
    }

    createDecoratedNews() {
        let newsItem = this.createNews();
        return new DecoratedNewsItem(newsItem.render());
    }

    render() {
        let newsItem = this.newsType !== Constants.defaultType ? this.createDecoratedNews() : this.createNews();
        return newsItem.render();
    }
}