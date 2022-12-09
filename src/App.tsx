import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { Todo } from './types/Todo';
import { TodoList } from './TodoList';
import { ForUpdating } from './types/ForUpdating';
import { UpdateModal } from './UpdateModal';

const App: React.FC = () => {
  const [items, setItems] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [buttonStatus, setButtonStatus] = useState<boolean>(true);
  const [todosCounter, setTodosCounter] = useState<string>('');
  const [updated, setUpdated] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatingId, setUpdatingId] = useState<string>('');

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
    setInputValue('');
  }

  const deleteTodo = (selectetTodoId: string) => {
    const newList = items.filter(item => item.id !== selectetTodoId)

    setItems(newList);
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
          return updatedItem;
        }

        if (willBeUpdated === ForUpdating.isSelected) {
          const updatedItem = {
            ...item,
            isSelected: !item.isSelected
          }
          return updatedItem;
        }
      }

      return item;
    });

    setItems(newList);
  }

  console.log(items)


  return (
    <>
      <h1>{todosCounter}</h1>
      <input
        className="input"
        type="text"
        placeholder="Enter todo here"
        value={inputValue.trimStart()}
        onChange={(event) => {
          const { value } = event.target;

          setInputValue(value);
        }}
      />
      <button
        onClick={() => addTodo(items, inputValue)}
        disabled={buttonStatus}
      >
        Submit
      </button>
      <TodoList todos={items} deleteTodo={deleteTodo} updateTodo={updateTodo} setIsUpdating={setIsUpdating} setUpdatingId={setUpdatingId} />
      {isUpdating && <UpdateModal updated={updated} setUpdated={setUpdated} setIsUpdating={setIsUpdating} updateTodo={updateTodo} updatingId={updatingId} />}
    </>
  );
}

export default App;
