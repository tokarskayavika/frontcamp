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

    onFormChange(e) {
        let newState = Object.assign(this.state);
        newState[e.target.name] = e.target.value;

        this.setState(newState);
    }

    addNewPost(e) {
        this.props.addNewPost(e, this.state);
        this.setState({});
    }

    render() {
        return(
            <form>
                <input type="text" name="author" placeholder="Add post author" onChange={this.onFormChange} />
                <input type="text" name="title" placeholder="Add post title" onChange={this.onFormChange} />
                <textarea name="description" placeholder="And post description here..." onChange={this.onFormChange} />
                <button onClick={this.addNewPost}>Add new post</button>
            </form>
        );
    }
}