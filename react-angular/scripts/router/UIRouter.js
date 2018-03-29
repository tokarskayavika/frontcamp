import React from 'react';
import {Route, Switch} from "react-router-dom";
import App from '../ui/posts/App';
import LoginPage from '../ui/user/LoginPage';
import RegistrationPage from '../ui/user/RegistrationPage';
import Unknown from '../ui/Unknown';

const UIRouter = props => (
    <Switch>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/registration' component={RegistrationPage}/>
        <Route path='/posts' component={App}/>
        <Route component={Unknown}/>
    </Switch>
);

module.exports = UIRouter;