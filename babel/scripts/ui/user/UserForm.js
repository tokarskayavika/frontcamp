import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';

export default class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.onFormChange = this.onFormChange.bind(this);
    }

    onFormChange(field, value) {
        const newState = Object.assign(this.state);
        newState[field] = value;

        this.setState(newState);
    }

    render() {
        return(
            <form id="user-form">
                <input type="text" value={this.state.username} placeholder="Your username..." onChange={(e) => this.onFormChange('username', e.target.value)} />
                <input type="password" value={this.state.password} placeholder="Your password..." onChange={(e) => this.onFormChange('password', e.target.value)} />
                <button className="button" onClick={(e) => this.props.onSubmit(e, this.state)}>Submit credentials</button>
            </form>
        );
    }
}

UserForm.propTypes = {
    onSubmit: PropTypes.func
};