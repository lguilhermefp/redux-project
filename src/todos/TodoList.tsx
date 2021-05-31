import React from 'react';
import { connect } from 'react-redux';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { removeTodo, markTodoAsCompleted } from '../redux-store/actions';
import './TodoList.css';

const TodoList = ({ todos = [], onRemovePressed, onCompletePressed } : any) => {
    return(
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
}

const mapStateToProps = (state : any) => ({
    todos: state.todos,
})

const mapDispatchToProps = (dispatch : any) => ({
    onRemovePressed: (text : any) => dispatch(removeTodo(text)),
    onCompletePressed: (text : any) => dispatch(markTodoAsCompleted(text))
})

export { TodoList };
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);