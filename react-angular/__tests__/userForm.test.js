import React from 'react';
import Enzyme from 'enzyme';
import UserForm from '../scripts/ui/user/UserForm';
import Adapter from 'enzyme-adapter-react-16';
import expectFrom from 'expect';
import enzymify from 'expect-enzyme';

Enzyme.configure({
    adapter: new Adapter()
});

expectFrom.extend(enzymify());

describe('User From Component', () => {
    let form;
    const mockFn = jest.fn();

    beforeEach(() => {
        form = Enzyme.mount(<UserForm onSubmit={mockFn} />);
    });

    it('form should contain a button submit', () => {
        expectFrom(form).toContain('button');
    });

    it('onFormChange should be called after triggering the input', () => {
        const spy = jest.spyOn(form.instance(), 'onFormChange');

        form.update();
        form.find('input[type="password"]').simulate('change');
        expect(spy).toHaveBeenCalled();
    });

    it('onFormChange works correctly', () => {
        const userForm = form.instance();

        userForm.onFormChange('password', '123');
        expect(userForm.state.password).toBe('123');
    });

    it('initial state should contain empty username and empty password', () => {
        const userForm = form.instance();
        const password = userForm.state.password;
        const username = userForm.state.username;

        expect(password).toBe('');
        expect(username).toBe('');
    });
});