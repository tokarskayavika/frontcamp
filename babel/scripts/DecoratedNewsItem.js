import NewsItem from './NewsItem';

export default class DecoratedNewsItem extends NewsItem {
    constructor(news) {
        super(news);
    }

    render() {
        let wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="decorated-news-wrapper">
                ${super.render().innerHTML}
            </div>
        `;

        return wrapper;
    }
}