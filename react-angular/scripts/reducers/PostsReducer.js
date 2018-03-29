export default function postsReducer(state = {}, action) {
    switch (action.type) {
        case 'SHOW_POSTS': {
            return Object.assign({}, state, {
                posts: action.payload,
                filterValue: ''
            });
        }

        case 'CHANGE_FILTER': {
            return Object.assign({}, state, {
                filterValue: action.payload
            });
        }

        default:
            return state;
    }
}