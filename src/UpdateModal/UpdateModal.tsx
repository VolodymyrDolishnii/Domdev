import React from 'react';
import { ForUpdating } from '../types/ForUpdating';

type Props = {
    updated: string,
    setUpdated: (x: string) => void,
    setIsUpdating: (x: boolean) => void,
    updateTodo: (todoId: string, willBeUpdated: ForUpdating) => void,
    updatingId: string
}

export const UpdateModal: React.FC<Props> = ({ updated, setUpdated, setIsUpdating, updateTodo, updatingId }) => {

    return (
        <div className='popupUpdating'>
            <input
                type="text"
                value={updated.trimStart()}
                onChange={(event) => {
                    const { value } = event.target;

                    setUpdated(value);
                }}
            />
            <button onClick={() => setIsUpdating(false)}>X</button>
            <button onClick={() => {
                updateTodo(updatingId, ForUpdating.text)
                setIsUpdating(false);
                setUpdated('');
            }}>OK</button>
        </div>
    );
}