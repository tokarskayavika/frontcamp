import * as Constants from './constants';

export default class NewsItem {
    constructor(news) {
        news.publishedAt = this.transformDate(news.publishedAt);
        this.newsData = news;
    }

    render() {
        let newsElement = document.createElement('li');
        let data = this.newsData;

        newsElement.innerHTML = `
            <h3 class="title">${data.title}</h3>
            <p class="image"><img src="${data.urlToImage}" alt="${data.title}"/></p>
            <div class="feed-info">
                <p class="author">${data.author ? data.author : ''}</p>
                <p class="publishedAt">published at ${data.publishedAt}</p>
                <p class="description">${data.description}</p>
                <p class="url">
                    <a href="${data.url}" target="_blank">Click to see full article</a>
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