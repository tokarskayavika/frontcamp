import PostForm from './PostForm';
import Filter from './Filter';
import PostContainer from './PostContainer';
import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from "react-redux";
import {mapStateToProps, mapActionsToProps} from '../../selectors/Selectors';
import PropTypes from 'prop-types';

class Application extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const loggedIn = this.props.user.loggedIn;
        const posts = this.props.posts.posts;

        if (!loggedIn) {
            return <Redirect to='/'/>;
        }

        return (
            <div>
                <div className='header'>
                    <h1>News Portal</h1>
                </div>
                <PostForm addPost={this.props.addPost} />
                {posts.length > 0 && <Filter changeFilterValue={(e) => this.props.changeFilterValue(e.target.value)} />}
                <PostContainer posts={posts} filterValue={this.props.posts.filterValue} deletePost={this.props.deletePost} />
            </div>
        );
    }
}

Application.propTypes = {
    addPost: PropTypes.func,
    deletePost: PropTypes.func,
    changeFilterValue: PropTypes.func
};

module.exports = connect(mapStateToProps, mapActionsToProps)(Application);
