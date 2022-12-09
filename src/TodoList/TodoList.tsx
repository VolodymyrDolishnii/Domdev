import React from 'react';
import { ForUpdating } from '../types/ForUpdating';
import { Todo } from '../types/Todo';

type Props = {
    todos: Todo[],
    deleteTodo: (selectedTodoId: string) => void,
    updateTodo: (todoId: string, willBeUpdated: ForUpdating) => void,
    setIsUpdating: (x: boolean) => void,
    setUpdatingId: (x: string) => void;
}

export const TodoList: React.FC<Props> = ({ todos, deleteTodo, updateTodo, setIsUpdating, setUpdatingId}) => {
    return(
        <>
            {todos.map(todo => (
                <div key={todo.id} className="item">
                    <input 
                        type="checkbox" 
                        defaultChecked={todo.isSelected}
                        onClick={() => updateTodo(todo.id, ForUpdating.isSelected)}
                    />
                    <li>{todo.text}</li>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    <button onClick={() => {
                        setIsUpdating(true);
                        setUpdatingId(todo.id)
                    }}>Update</button>
                </div>
            ))}
        </>
    )
}