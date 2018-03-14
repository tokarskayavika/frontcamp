import React from 'react';
import {Link} from 'react-router-dom';
import UserForm from './UserForm.js';
import image from '../../../style/images/lemons.jpg';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {mapStateToProps, mapActionsToProps} from '../../selectors/Selectors';
import PropTypes from 'prop-types';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const loggedIn = this.props.user.loggedIn;

        if (loggedIn) {
            return <Redirect to='/posts'/>;
        }

        return(
            <div className="form-wrapper">
                <img src={image} />
                <div className="authorization-section">
                    <h5>Login form</h5>
                    <UserForm onSubmit={this.props.userLogin} />
                    <h6>or</h6>
                    <Link className="button" to="/registration">Register</Link>
                    {this.props.user.loginError && <p className="error">{this.props.user.loginError}</p>}
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    userLogin: PropTypes.func
};

module.exports = connect(mapStateToProps, mapActionsToProps)(LoginPage);