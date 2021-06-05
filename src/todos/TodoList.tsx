import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { displayAlert, loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from '../redux-store/thunks';
import './TodoList.css';

const TodoList = ({ todos = [], onRemovePressed, onCompletePressed, isLoading, startLoadingTodos } : any) => {
    useEffect(() => {
        startLoadingTodos();
    }, [])

    const loadingMessage = <div>Loading todos</div>;
    const content = (
        <div className = "list-wrapper">
            <NewTodoForm />
            {todos.map((todo : any) => 
                <TodoListItem
                    todo={todo}
                    onRemovePressed={onRemovePressed}
                    onCompletePressed={onCompletePressed}/>
            )}
        </div>
    );
    return isLoading ? loadingMessage : content;
}

const mapStateToProps = (state : any) => ({
    isLoading : state.isLoading,
    todos: state.todos,
})

const mapDispatchToProps = (dispatch : any) => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: (id : any) => dispatch(removeTodoRequest(id)),
    onCompletePressed: (id : string) => dispatch(markTodoAsCompletedRequest(id)),
    onDisplayAlertFired: (text : string) => dispatch(displayAlert(text))
})

export { TodoList };
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);