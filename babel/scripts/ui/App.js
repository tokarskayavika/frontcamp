import PostForm from './PostForm';
import Filter from './Filter';
import PostContainer from './PostContainer';
import React, {Component} from 'react';

class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            filterValue: ''
        };
        this.addNewPost = this.addNewPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.changeFilterValue = this.changeFilterValue.bind(this);
    }

    addNewPost(newPost) {
        let posts = this.state.posts;

        if (newPost.author && newPost.description && newPost.title) {
            posts.push(newPost);

            this.setState({
                posts: posts
            });
        }
    }

    deletePost(postId) {
        let posts = this.state.posts;
        posts.splice(postId, 1);

        this.setState({
            posts: posts
        });
    }

    changeFilterValue(e) {
        let filterValue = e.target.value;

        this.setState({
            filterValue: filterValue
        });
    }

    render() {
        return (
            <div>
                <PostForm addNewPost={this.addNewPost} />
                {this.state.posts.length > 0 && <Filter changeFilterValue={this.changeFilterValue} />}
                <PostContainer posts={this.state.posts} filterValue={this.state.filterValue} deletePost={this.deletePost} />
            </div>
        );
    }
}

module.exports = Application;