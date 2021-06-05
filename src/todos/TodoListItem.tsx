import React from 'react';
import './TodoListItem.css';

const TodoListItem = ({ todo, onRemovePressed, onCompletePressed } : any) => {
    return(
        <div className="todo-item-container">
            <h3>{todo.text}</h3>
            <div className="buttons-container">
                {todo.isCompleted
                    ? null
                    : <button
                        className="completed-button"
                        onClick={() => onCompletePressed(todo.id)}>Marcar como completo</button>}
                <button
                    onClick={() => onRemovePressed(todo.id)}
                    className="remove-button">Remover</button>
            </div>
        </div>
    )
}

export default TodoListItem;