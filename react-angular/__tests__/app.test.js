import React from 'react';
import Enzyme from 'enzyme';
import App from '../scripts/ui/posts/App';
import Adapter from 'enzyme-adapter-react-16';
import expectFrom from 'expect';
import enzymify from 'expect-enzyme';
import configureStore from 'redux-mock-store';

Enzyme.configure({
    adapter: new Adapter()
});

expectFrom.extend(enzymify());

describe('Application Component', () => {
    let app;
    const initialState = {
        user: {
            loggedIn: false
        },
        posts: {
            posts: []
        }
    };
    const mockStore = configureStore();

    it('should render posts page if loggedIn', () => {
        initialState.user.loggedIn = true;
        const store = mockStore(initialState);
        app = Enzyme.mount(<App store={store}/>);

        expectFrom(app).toContain('.application');
    });
});