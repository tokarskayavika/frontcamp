import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';

export default class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getDefaultStateObject();
        this.onFormChange = this.onFormChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addPost = props.addPost.bind(this);
    }

    getDefaultStateObject() {
        return {
            author: '',
            title: '',
            description: ''
        };
    }

    clearState() {
        this.setState(this.getDefaultStateObject());
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.state.author || !this.state.title || !this.state.description) {
            return;
        }

        this.addPost(this.state);
        this.clearState();
    }

    onFormChange(field, value) {
        const newState = Object.assign(this.state);
        newState[field] = value;

        this.setState(newState);
    }

    render() {
        return(
            <form id="add-post-form">
                <input value={this.state.author} type="text" placeholder="Add post author" onChange={(e) => this.onFormChange('author', e.target.value)} />
                <input value={this.state.title} type="text" placeholder="Add post title" onChange={(e) => this.onFormChange('title', e.target.value)} />
                <textarea value={this.state.description} placeholder="And post description here..." onChange={(e) => this.onFormChange('description', e.target.value)} />
                <button onClick={(e) => this.onSubmit(e, this.state)}>Add new post</button>
            </form>
        );
    }
}

PostForm.propTypes = {
    author: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    addPost: PropTypes.func
};