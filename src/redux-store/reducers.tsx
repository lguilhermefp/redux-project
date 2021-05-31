import { CREATE_TODO, REMOVE_TODO, MARK_TODO_AS_COMPLETED } from './actions'

export const todos = (state = [], action : any) => {
    const { type, payload } = action;

    switch(type) {
        case CREATE_TODO: {
            const { text } = payload;
            const newTodo : any = {text, isCompleted: false}
            return state.concat(newTodo);
        }
        case REMOVE_TODO: {
            const { text } = payload;
            return state.filter((todo : any) => todo.text !== text);
        }
        case MARK_TODO_AS_COMPLETED: {
            const { text } = payload;
            return state.map((todo : any) => {if (todo.text === text) {return {...state, text: text, isCompleted: true}};
            return todo;
        });
        }
        default:
            return state;
    }
}