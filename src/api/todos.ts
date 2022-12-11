import { items } from "./Fetch";
import { Todo } from "../types/Todo";

export const getTodos = () => {
    return items.get<Todo[]>(`/todos`);
};

export const postTodo = (newComment: Todo) => {
    return items.post('/todos', newComment);
}

export const deleteTodoFromServer = (todoId: string) => {
    return items.delete(`/todos/${todoId}`);
}

export const patchTodo = (todoId: string, updatedTodo: Todo) => {
    return items.patch(`/todos/${todoId}`, updatedTodo);
}