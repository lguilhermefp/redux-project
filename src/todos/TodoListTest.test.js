import { todos } from '../redux-store/reducers'

describe('the todos reducer', () => {
    it('adds a new todo', () => {
        const fakeTodo = { id:'123', text: 'hello', description: '', situation: 'notCompleted'}
        const fakeAction = {
            type:'CREATE_TODO',
            payload: {
                todo: fakeTodo
            }
        };
        const originalState = { data: []};

        const expected = {
            data: [fakeTodo]
        }
        const actual = todos(originalState, fakeAction);

        // eslint-disable-next-line jest/valid-expect
        expect(actual).to.deep.equal(expected);
    });
})