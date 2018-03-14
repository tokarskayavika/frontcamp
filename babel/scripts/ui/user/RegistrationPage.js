import React from 'react';
import UserForm from './UserForm.js';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {mapStateToProps, mapActionsToProps} from '../../selectors/Selectors';
import PropTypes from 'prop-types';

export default class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const loggedIn = this.props.user.loggedIn;

        if (loggedIn) {
            return <Redirect to='/posts'/>;
        }

        return(
            <div className="form-wrapper registration-page">
                <div className="registration-section">
                    <h5>Registration form</h5>
                    <UserForm onSubmit={this.props.userRegistration} />
                    {this.props.user.registrationError && <p className="error">{this.props.user.registrationError}</p>}
                </div>
            </div>
        );
    }
}

RegistrationPage.propTypes = {
    userRegistration: PropTypes.func
};

module.exports = connect(mapStateToProps, mapActionsToProps)(RegistrationPage);