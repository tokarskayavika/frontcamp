import React from 'react';
import {render} from 'react-dom';
import NewsItem from './NewsItem';

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
                id={id}
                data={post}
                deletePost={this.props.deletePost}
            />
        );

        return(
            <ul id="feed">
                {postsElements}
            </ul>
        );
    }
}