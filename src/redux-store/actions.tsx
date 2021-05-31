export const CREATE_TODO = 'CREATE_TODO';
export const createTodo = (text : any) => ({
    type: CREATE_TODO,
    payload: { text }
});

export const REMOVE_TODO = 'REMOVE_TODO';
export const removeTodo = (text : any) => ({
    type: REMOVE_TODO,
    payload: { text }
})

export const MARK_TODO_AS_COMPLETED = 'MARK_TODO_AS_COMPLETED';
export const markTodoAsCompleted = (text : any) => ({
    type: MARK_TODO_AS_COMPLETED,
    payload: { text }
})