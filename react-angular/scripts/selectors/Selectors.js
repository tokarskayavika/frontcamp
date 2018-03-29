import axios from 'axios';
import config from '../config';

function mapStateToProps(state) {
    return state;
}

function mapActionsToProps(dispatch) {
    let onUserSuccess = function() {
        axios.get(config.api.posts.url
        )
            .then(function(response) {
                dispatch({
                    type: 'SHOW_POSTS',
                    payload: response.data
                });
            })
            .then(function() {
                dispatch({
                    type: 'LOGIN_SUCCESS'
                });
            });
    };

    return {
        userLogin: function(e, data) {
            e.preventDefault();

            axios.post(config.api.user.login, {
                username: data.username,
                password: data.password
            })
                .then(function(response) {
                    if (response.data.error) {
                        dispatch({
                            type: 'LOGIN_ERROR',
                            payload: response.data.error
                        });
                    } else {
                        onUserSuccess();
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        userRegistration: function(e, data) {
            e.preventDefault();

            axios.post(config.api.user.register, {
                username: data.username,
                password: data.password
            })
                .then(function(response) {
                    if (response.data.error) {
                        dispatch({
                            type: 'REGISTRATION_ERROR',
                            payload: response.data.error
                        });
                    } else {
                        onUserSuccess();
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });

        },

        changeFilterValue: function(value) {
            dispatch({
                type: 'CHANGE_FILTER',
                payload: value
            });
        }
    }
}

export {mapStateToProps, mapActionsToProps};