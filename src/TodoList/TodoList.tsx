import React, { useState } from 'react';
import { ForUpdating } from '../types/ForUpdating';
import { Todo } from '../types/Todo';
import { UpdateModal } from '../UpdateModal';

type Props = {
    todos: Todo[],
    deleteTodo: (selectedTodoId: string) => void,
    updateTodo: (todoId: string, willBeUpdated: ForUpdating) => void,
    setIsUpdating: (x: boolean) => void,
    isUpdating: boolean,
    updated: string,
    setUpdated: (x: string) => void
}

export const TodoList: React.FC<Props> = ({ todos, deleteTodo, updateTodo, setIsUpdating, isUpdating, updated, setUpdated }) => {
    const [selectedId, setSelectedId] = useState<string>('');

    return (
        <ul className='list'>
            {todos.map(todo => (
                <li key={todo.id} className="list__item">
                    <div className="firstPart">
                        <input
                            type="checkbox"
                            defaultChecked={todo.isSelected}
                            onClick={() => updateTodo(todo.id, ForUpdating.isSelected)}
                        />
                        <p 
                            className='is-size-2 is-vcentered todoText' 
                            style={ (todo.isSelected) 
                                ? {textDecoration: "line-through",
                                textDecorationColor: "red"} 
                                : {}}
                            >
                                {todo.text}
                            </p>
                    </div>

                    <div className="list__buttons">
                        <button
                            className="button is-danger is-rounded"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            Delete
                        </button>
                        <button
                            className='button is-success is-rounded'
                            onClick={() => {
                                setIsUpdating(true);
                                setSelectedId(todo.id);
                            }}>Update</button>
                        {(isUpdating && selectedId === todo.id)
                            &&
                            (<UpdateModal
                                updated={updated}
                                setUpdated={setUpdated}
                                setIsUpdating={setIsUpdating}
                                updateTodo={updateTodo}
                                updatingId={todo.id}
                            />)
                        }
                    </div>
                </li>
            ))}
        </ul>
    )
}