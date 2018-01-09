export default function reducer(action) {
    let storeCopy = Object.assign(this.getState());

    switch(action.type) {
        case 'GET_NEWS':
            return {
                ...storeCopy,
                news: action.news,
                newsType: action.newsType
            };
        default:
            return storeCopy;
    }
}