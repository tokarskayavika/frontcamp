import UserReducer from '../scripts/reducers/UserReducer';

describe('User Reducer', () => {
    let state;

    beforeEach(() => {
        state = {
            fakeField: 'fake'
        };
    });

    it('state should be changed on login error', () => {
        let newState = UserReducer(state, {
            type: 'LOGIN_ERROR',
            payload: '1'
        });

        expect(newState.loginError).toBe('1');
        expect(newState.loggedIn).toBe(false);
        expect(newState.fakeField).toBe('fake');
    });

    it('state should be changed on login success', () => {
        let newState = UserReducer(state, {
            type: 'LOGIN_SUCCESS',
            payload: '1'
        });

        expect(newState.loginError).not.toBe('1');
        expect(newState.loggedIn).toBe(true);
        expect(newState.fakeField).toBe('fake');
    });

    it('should return state on unknown action', () => {
        let newState = UserReducer(state, {
            type: 'UNKNOWN_ACTION',
            payload: '1'
        });

        expect(newState).toBe(state);
    });
});