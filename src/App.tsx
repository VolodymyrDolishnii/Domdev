import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.scss';
import { Todo } from './types/Todo';
import { TodoList } from './TodoList';
import { ForUpdating } from './types/ForUpdating';
import { deleteTodoFromServer, getTodos, patchTodo, postTodo } from './api/todos';
import { Loader } from './Loader';

const App: React.FC = () => {
  const [items, setItems] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [buttonStatus, setButtonStatus] = useState<boolean>(true);
  const [todosCounter, setTodosCounter] = useState<string>('');
  const [updated, setUpdated] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getTodos()
      .then(response => {
        setItems(response);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (inputValue.trimStart().length === 0) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  }, [inputValue])

  const addTodo = (list: Todo[], todoText: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      text: todoText,
      isSelected: false
    };

    const newList = [...list, newTodo];

    setItems(newList);
    postTodo(newTodo);
    setInputValue('');
  }

  const deleteTodo = (selectetTodoId: string) => {
    const newList = items.filter(item => item.id !== selectetTodoId)

    setItems(newList);
    deleteTodoFromServer(selectetTodoId);
  }

  useEffect(() => {
    if (items.length === 0) {
      setTodosCounter('The list is still empty');
    }

    if (items.length === 1) {
      setTodosCounter('Todo: ');
    }

    if (items.length > 1) {
      setTodosCounter(`Todos (${items.length}): `)
    }
  }, [items.length]);

  const updateTodo = (todoId: string, willBeUpdated: ForUpdating) => {
    const newList = items.map(item => {
      if (item.id === todoId) {
        if (willBeUpdated === ForUpdating.text) {
          setIsUpdating(true);
          const updatedItem = {
            ...item,
            text: updated
          }
          patchTodo(todoId, updatedItem);
          return updatedItem;
        }

        if (willBeUpdated === ForUpdating.isSelected) {
          const updatedItem = {
            ...item,
            isSelected: !item.isSelected
          }
          patchTodo(todoId, updatedItem);
          return updatedItem;
        }
      }

      return item;
    });

    setItems(newList);
  }

  return (
    <div className='page'>
      {isLoading
        ? (<Loader />)
        : (
          <>
            {isError
              ? (<h1 className='is-size-1'>Error</h1>)
              : (<>
                <h1 className='is-size-1'>{todosCounter}</h1>
                <div className="todoInput">
                  <input
                    className="input is-rounded"
                    type="text"
                    placeholder="Enter todo here"
                    value={inputValue.trimStart()}
                    onChange={(event) => {
                      const { value } = event.target;

                      setInputValue(value);
                    }}
                  />
                  <button
                    className="button is-link is-rounded"
                    onClick={() => addTodo(items, inputValue)}
                    disabled={buttonStatus}
                  >
                    Submit
                  </button>
                </div>
                <TodoList
                  todos={items}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                  setIsUpdating={setIsUpdating}
                  isUpdating={isUpdating}
                  updated={updated}
                  setUpdated={setUpdated}
                />
              </>)
            }
          </>
        )
      }
    </div>
  );
}

export default App;
