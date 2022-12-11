import React, { useState, useEffect } from 'react';
import { ForUpdating } from '../types/ForUpdating';

type Props = {
    updated: string,
    setUpdated: (x: string) => void,
    setIsUpdating: (x: boolean) => void,
    updateTodo: (todoId: string, willBeUpdated: ForUpdating) => void,
    updatingId: string
}

export const UpdateModal: React.FC<Props> = ({ updated, setUpdated, setIsUpdating, updateTodo, updatingId }) => {
    const [buttonStatus, setButtonStatus] = useState<boolean>(true);

    useEffect(() => {
        if (updated.length > 0) {
            setButtonStatus(false);
        } else {
            setButtonStatus(true);
        }
    }, [updated.length])

    return (
        <div className='popupUpdating'>
            <input
                className="input is-rounded"
                type="text"
                placeholder="Type something"
                value={updated.trimStart()}
                onChange={(event) => {
                    const { value } = event.target;

                    setUpdated(value.trimStart());
                }}
            />
            <button
                className='button is-rounded '
                onClick={() => {
                    setIsUpdating(false);
                    setUpdated('');
                }}>Cancel</button>
            <button
                className="button is-rounded is-primary"
                disabled={buttonStatus}
                onClick={() => {
                    updateTodo(updatingId, ForUpdating.text)
                    setIsUpdating(false);
                    setUpdated('');
                }}>OK</button>
        </div>
    );
}