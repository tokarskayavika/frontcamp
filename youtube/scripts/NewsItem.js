import * as Constants from './constants';

export default class NewsItem {
    constructor(news) {
        this.title = news.title;
        this.urlToImage = news.urlToImage;
        this.author = news.author;
        this.publishedAt = this.transformDate(news.publishedAt);
        this.description = news.description;
        this.url = news.url;
    }

    render() {
        let newsElement = document.createElement('li');

        newsElement.innerHTML = `
            <h3 class="title">${this.title}</h3>
            <p class="image"><img src="${this.urlToImage}" alt="${this.title}"/></p>
            <div class="feed-info">
                <p class="author">${this.author ? this.author : ''}</p>
                <p class="publishedAt">published at ${this.publishedAt}</p>
                <p class="description">${this.description}</p>
                <p class="url">
                    <a href="${this.url}" target="_blank">Click to see full article</a>
                </p>
            </div>
        `;

        return newsElement;
    }

    transformDate(date) {
        let dateObject =  new Date(date);
        return dateObject.toLocaleDateString('en', Constants.options);
    }
}