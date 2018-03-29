import React from 'react';
import {render} from 'react-dom';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';

export default class PostContainer extends React.Component {
    constructor(props) {
        super(props);
        this.sortPosts = this.sortPosts.bind(this);
    }

    sortPosts() {
        const filterValue = this.props.filterValue;

        return this.props.posts.filter(function(post) {
            return post.author.toLowerCase().includes(filterValue.toLowerCase());
        });
    }

    render() {
        const postsElements = this.sortPosts().map((post, id) =>
            <NewsItem
                key={id}
                id={post._id}
                data={post}
            />
        );

        return(
            <ul id="feed">
                {postsElements}
            </ul>
        );
    }
}

PostContainer.propTypes = {
    posts: PropTypes.array
};