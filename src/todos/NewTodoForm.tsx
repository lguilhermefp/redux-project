import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTodo } from '../redux-store/actions'
import './NewTodoForm.css';


const NewTodoForm = ({ todos, onCreatePressed } : any) => {
    const [inputValue, setInputValue] = useState('');

    return(
        <div className="new-todo-form">
            <input
                className="new-todo-input"
                type="text"
                value={inputValue}
                placeholder="Type your new todo here"
                onChange={(e => setInputValue(e.target.value))}/>
            <button
                onClick={() => {
                    const isDuplicatedTask = todos.some((todo : any) => todo.text === inputValue);
                    if(!isDuplicatedTask){
                        onCreatePressed(inputValue);
                        setInputValue('');
                    }
                }}
                className="new-todo-button">Create todo</button>
        </div>
    );
}

const mapStateToProps = (state : any) => ({
    todos: state.todos
});
const mapDispatchToProps = (dispatch : any) => ({
    onCreatePressed : (text : any) => dispatch(createTodo(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);