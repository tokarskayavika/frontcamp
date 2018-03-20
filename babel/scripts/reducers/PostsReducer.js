export default function postsReducer(state = {}, action) {
    switch (action.type) {
        case 'SHOW_POSTS': {
            return Object.assign({}, state, {
                posts: action.payload,
                filterValue: ''
            });
        }

        case 'ADD_POST': {
            const posts = state.posts;

            posts.push(action.payload);

            return Object.assign({}, state, {
                posts: posts
            });
        }

        case 'DELETE_POST': {
            const posts = state.posts;
            const postId = action.payload;

            return Object.assign({}, state, {
                posts: posts.filter(post => post._id !== postId)
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