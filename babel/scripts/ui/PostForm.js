import React from 'react';
import {render} from 'react-dom';

export default class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: props.author,
            title: props.title,
            description: props.description
        };
        this.onFormChange = this.onFormChange.bind(this);
        this.addNewPost = this.addNewPost.bind(this);
    }

    clearState() {
        this.setState({
            author: '',
            title: '',
            description: ''
        });
    }

    onFormChange(field, value) {
        const newState = Object.assign(this.state);
        newState[field] = value;

        this.setState(newState);
    }

    addNewPost(e) {
        e.preventDefault();
        this.props.addNewPost(this.state);
        this.clearState();
    }

    render() {
        return(
            <form>
                <input value={this.state.author} type="text" placeholder="Add post author" onChange={(e) => this.onFormChange('author', e.target.value)} />
                <input value={this.state.title} type="text" placeholder="Add post title" onChange={(e) => this.onFormChange('title', e.target.value)} />
                <textarea value={this.state.description} placeholder="And post description here..." onChange={(e) => this.onFormChange('description', e.target.value)} />
                <button onClick={this.addNewPost}>Add new post</button>
            </form>
        );
    }
}