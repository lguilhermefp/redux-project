import {
    loadTodosInProgress,
    loadTodosSuccess,
    loadTodosFailure,
    createTodo,
    removeTodo,
    markTodoAsCompleted
} from './actions';

const url = 'http://localhost:8080';

export const loadTodos = () => async (dispatch : any, getState : any) => {
    try{
        dispatch(loadTodosInProgress());
        const response = await fetch(`${url}/api/todos`);
        const todos = await response.json();

        dispatch(loadTodosSuccess(todos));
    }
    catch(e : any) {
        dispatch(loadTodosFailure());
        dispatch(displayAlert(e));
    }
}

export const loadSingleTodo = (id : string) => async (dispatch : any, getState : any) => {
    try{
        dispatch(loadTodosInProgress());
        const response = await fetch(`${url}/api/todos/${id}`);
        const todo = await response.json();

        dispatch(loadTodosSuccess(todo));
    }
    catch(e : any) {
        dispatch(loadTodosFailure());
        dispatch(displayAlert(e));
    }
}

export const addTodoRequest = (text : string) => async (dispatch : any) => {
    try{
        const body = JSON.stringify({ text });
        const response = await fetch(`${url}/api/todos`, {
            headers: {
                'Content-type': 'application/json',
            },
            method: 'post',
            body
        })
        const todo = await response.json();
        dispatch(createTodo(todo));
    }catch(e : any){
        dispatch(displayAlert(e));
    }
}

export const removeTodoRequest = (id : any) => async (dispatch : any) => {
    try {
        const response = await fetch(`${url}/api/todos/${id}`, {
            method: 'delete'
        });
        const removedTodo = await response.json();
        dispatch(removeTodo(removedTodo));
    }catch(e : any){
        dispatch(displayAlert(e));
    }
}

export const markTodoAsCompletedRequest = (id : any) => async( dispatch : any) => {
    try {
        const response = await fetch(`${url}/api/todos/${id}/completed`, {
            method: 'post'
        });
        const updatedTodo = await response.json();
        dispatch(markTodoAsCompleted(updatedTodo));
    }catch(e : any){
        dispatch(displayAlert(e));
    }
}

export const displayAlert = (text : string) => () => {
    alert(text);
}